import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteRooms() {
    const [rooms, setRooms] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rooms');
                if (!response.ok) {
                    throw new Error('Failed to fetch rooms');
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleDelete = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                setDialogContent(errorData.message);
                setOpenDialog(true);
            } else {
                setRooms(rooms.filter((room) => room.room_id !== roomId));
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Failed to delete room:', error);
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
                <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Delete Rooms</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell>Hotel ID</TableCell>
                            <TableCell>Room Number</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Capacity</TableCell>
                            <TableCell>View</TableCell>
                            <TableCell>Damages</TableCell>
                            <TableCell>Extendable</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room) => (
                            <TableRow key={room.room_id}>
                                <TableCell>{room.room_id}</TableCell>
                                <TableCell>{room.hotel_id}</TableCell>
                                <TableCell>{room.room_number}</TableCell>
                                <TableCell>{room.price}</TableCell>
                                <TableCell>{room.capacity}</TableCell>
                                <TableCell>{room.view}</TableCell>
                                <TableCell>{room.damages}</TableCell>
                                <TableCell>{room.extendable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDelete(room.room_id)} color="error">
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
                    Room deleted successfully!
                </Alert>
            </Snackbar>
            <DialogBox />
        </>
    );
}

export default DeleteRooms;
