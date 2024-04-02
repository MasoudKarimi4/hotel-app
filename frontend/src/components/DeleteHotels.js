import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton, Snackbar, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, Button 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteHotels() {
    const [hotels, setHotels] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/hotels'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    const handleDelete = async (hotelId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                setDialogContent(data.message);
                setOpenDialog(true);
            } else {
                setHotels(hotels.filter((hotel) => hotel.hotel_id !== hotelId));
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Failed to delete hotel:', error);
        }
    };

    const DialogBox = () => (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>{"Action Needed"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogContent}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Delete Hotels</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Hotel ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Chain ID</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Manager ID</TableCell>
                            <TableCell>Number of Rooms</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hotels.map((hotel) => (
                            <TableRow key={hotel.hotel_id}>
                                <TableCell>{hotel.hotel_id}</TableCell>
                                <TableCell>{hotel.name}</TableCell>
                                <TableCell>{hotel.chain_id}</TableCell>
                                <TableCell>{hotel.rating}</TableCell>
                                <TableCell>{hotel.manager_id}</TableCell>
                                <TableCell>{hotel.num_rooms}</TableCell>
                                <TableCell>{hotel.address}</TableCell>
                                <TableCell>{hotel.phone_number}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDelete(hotel.hotel_id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Hotel deleted successfully!
                </Alert>
            </Snackbar>
            <DialogBox />
        </>
    );
}

export default DeleteHotels;
