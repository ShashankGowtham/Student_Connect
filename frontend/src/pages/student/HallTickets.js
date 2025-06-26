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
    Button,
    Typography,
    CircularProgress,
    Alert
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

const HallTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloadError, setDownloadError] = useState(null);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                console.log('Fetching tickets for student:', currentUser._id);
                const response = await axios.get(`http://localhost:5000/student/halltickets/${currentUser._id}`);
                console.log('Tickets response:', response.data);
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

        if (currentUser?._id) {
            fetchTickets();
        }
    }, [currentUser?._id]);

    const handleDownload = async (ticketId) => {
        try {
            setDownloadError(null);
            console.log('Downloading ticket:', ticketId);
            const response = await axios.get(
                `http://localhost:5000/hallticket/download/${currentUser._id}/${ticketId}`,
                { responseType: 'blob' }
            );

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `hall_ticket.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading hall ticket:', error);
            setDownloadError('Failed to download hall ticket. Please try again.');
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px' }}>
                <Alert severity="error">{error}</Alert>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Hall Tickets
            </Typography>

            {downloadError && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>{downloadError}</Alert>
            )}

            {tickets.length === 0 ? (
                <Alert severity="info">No hall tickets available for your class.</Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exam Name</TableCell>
                                <TableCell>Release Date</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow key={ticket._id}>
                                    <TableCell>{ticket.examName}</TableCell>
                                    <TableCell>
                                        {new Date(ticket.releaseDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            startIcon={<DownloadIcon />}
                                            onClick={() => handleDownload(ticket._id)}
                                        >
                                            Download
                                        </Button>
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

export default HallTickets; 