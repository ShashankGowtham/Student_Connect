import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Paper,
    Box,
    Typography,
    Button,
    Container
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import styled from '@emotion/styled';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '32px',
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    border: '1px solid #000000',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const IconWrapper = styled(Box)({
    marginBottom: '16px',
    '& svg': {
        fontSize: '48px',
        color: '#000000',
    },
});

const ChooseUser = ({ visitor }) => {
    const navigate = useNavigate();

    const handleCardClick = (role) => {
        if (visitor === "guest") {
            if (role === "Admin") {
                navigate('/Adminlogin');
            }
            else if (role === "Student") {
                navigate('/Studentlogin');
            }
            else if (role === "Teacher") {
                navigate('/Teacherlogin');
            }
        }
        else {
            if (role === "Admin") {
                navigate('/Adminregister');
            }
            else {
                navigate('/');
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#FFFFFF',
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        mb: 6,
                        fontWeight: 600,
                        color: '#000000',
                    }}
                >
                    Choose Your Role
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <StyledPaper onClick={() => handleCardClick("Student")}>
                            <IconWrapper>
                                <SchoolIcon />
                            </IconWrapper>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                Student
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, color: '#333333' }}>
                                Access your courses, assignments, and grades
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: '#000000',
                                    color: '#000000',
                                    '&:hover': {
                                        borderColor: '#333333',
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            >
                                Login as Student
                            </Button>
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <StyledPaper onClick={() => handleCardClick("Teacher")}>
                            <IconWrapper>
                                <PersonIcon />
                            </IconWrapper>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                Teacher
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, color: '#333333' }}>
                                Manage your classes and student progress
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: '#000000',
                                    color: '#000000',
                                    '&:hover': {
                                        borderColor: '#333333',
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            >
                                Login as Teacher
                            </Button>
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <StyledPaper onClick={() => handleCardClick("Admin")}>
                            <IconWrapper>
                                <SupervisorAccountIcon />
                            </IconWrapper>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                Admin
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, color: '#333333' }}>
                                Oversee and manage the entire system
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: '#000000',
                                    color: '#000000',
                                    '&:hover': {
                                        borderColor: '#333333',
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                }}
                            >
                                {visitor === "guest" ? "Login as Admin" : "Register as Admin"}
                            </Button>
                        </StyledPaper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ChooseUser; 