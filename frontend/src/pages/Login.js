import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Grid,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../redux/userRelated/userHandle';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '32px',
    maxWidth: '400px',
    width: '100%',
    border: '1px solid #000',
}));

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!role) {
            setError('Please select a role');
            setLoading(false);
            return;
        }

        try {
            const response = await dispatch(loginUser(formData, role));
            if (response?.payload?.success) {
                navigate(`/${role}/dashboard`);
            } else {
                setError(response?.payload?.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}
        >
            <StyledPaper elevation={3}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        sx={{ mb: 4, fontWeight: 600, color: '#000' }}
                    >
                        Student Connect
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                            required
                        >
                            <MenuItem value="Student">Student</MenuItem>
                            <MenuItem value="Teacher">Teacher</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formData.email}
                        onChange={handleInputChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            bgcolor: '#000',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#333',
                            },
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </Box>
            </StyledPaper>
        </Grid>
    );
};

export default Login; 