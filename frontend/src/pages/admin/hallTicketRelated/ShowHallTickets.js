import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    IconButton,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowHallTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/halltickets/${currentUser._id}`);
                if (response.data.error) {
                    throw new Error(response.data.error);
                }
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError(error.response?.data?.error || error.message || 'Failed to fetch hall tickets');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [currentUser._id]);

    const handleDelete = async (ticketId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/hallticket/${ticketId}`);
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            setTickets(tickets.filter(ticket => ticket._id !== ticketId));
        } catch (error) {
            console.error('Error deleting hall ticket:', error);
            setError(error.response?.data?.error || error.message || 'Failed to delete hall ticket');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h5">
                    Released Hall Tickets
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/Admin/releasehallticket')}
                >
                    Release New Hall Ticket
                </Button>
            </div>

            {tickets.length === 0 ? (
                <Typography>No hall tickets have been released yet.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exam Name</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Release Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket._id}>
                                    <TableCell>{ticket.examName}</TableCell>
                                    <TableCell>{ticket.class.sclassName}</TableCell>
                                    <TableCell>
                                        {new Date(ticket.releaseDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {ticket.isActive ? 'Active' : 'Inactive'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => handleDelete(ticket._id)}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ShowHallTickets; 