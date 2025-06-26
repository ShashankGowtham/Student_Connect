import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const ReleaseHallTicket = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [examName, setExamName] = useState('');
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { sclassesList } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [dispatch, currentUser._id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Create hall tickets for each selected class
            await Promise.all(selectedClasses.map(async (classId) => {
                const response = await axios.post('http://localhost:5000/hallticket', {
                    examName,
                    schoolId: currentUser._id,
                    classId
                });
                if (response.data.error) {
                    throw new Error(response.data.error);
                }
            }));
            navigate('/Admin/halltickets');
        } catch (error) {
            console.error('Error creating hall tickets:', error);
            setError(error.response?.data?.error || error.message || 'Failed to create hall tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedClasses(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className="register">
            <form className="registerForm" onSubmit={handleSubmit}>
                <span className="registerTitle">Release Hall Ticket</span>

                <label>Exam Name</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter exam name..."
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    required
                />

                <FormControl fullWidth required sx={{ mt: 2 }}>
                    <InputLabel>Select Classes</InputLabel>
                    <Select
                        multiple
                        value={selectedClasses}
                        onChange={handleClassChange}
                        input={<OutlinedInput label="Select Classes" />}
                        renderValue={(selected) => {
                            const selectedNames = selected.map(id => 
                                sclassesList.find(sclass => sclass._id === id)?.sclassName
                            );
                            return selectedNames.join(', ');
                        }}
                        MenuProps={MenuProps}
                    >
                        {sclassesList.map((sclass) => (
                            <MenuItem key={sclass._id} value={sclass._id}>
                                <Checkbox checked={selectedClasses.indexOf(sclass._id) > -1} />
                                <ListItemText primary={sclass.sclassName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {error && <div className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

                <button 
                    className="registerButton" 
                    type="submit" 
                    disabled={loading || selectedClasses.length === 0}
                    style={{ marginTop: '20px' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Release Hall Tickets'}
                </button>
            </form>
        </div>
    );
};

export default ReleaseHallTicket; 