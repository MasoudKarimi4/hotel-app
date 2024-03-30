import React, { useState, useEffect } from 'react';
import {
    Typography, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, IconButton, TextField, Button, Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateRooms() {
    const [rooms, setRooms] = useState([]);
    const [editingRoomId, setEditingRoomId] = useState(null);
    const [editedRoom, setEditedRoom] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await fetch('http://localhost:5000/api/rooms');
            const data = await response.json();
            setRooms(data);
        };
        fetchRooms();
    }, []);

    const isEditing = (id) => editingRoomId === id;


    const handleEdit = (room) => {
        setEditingRoomId(room.room_id);
        setEditedRoom({ ...room });
    };

    const handleCancelEdit = () => {
        setEditingRoomId(null);
        setEditedRoom({});
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/rooms/${editingRoomId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedRoom),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setSnackbarMessage(errorData.message || 'Failed to update room');
                setOpenSnackbar(true);
                return;
            }

            const updatedRoomData = await response.json();
            setRooms(rooms.map((room) => (
                room.room_id === editingRoomId ? updatedRoomData : room
            )));
            handleCancelEdit();
            setSnackbarMessage('Room updated successfully!');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Failed to update room:', error);
            setSnackbarMessage('An error occurred while updating the room.');
            setOpenSnackbar(true);
        }
    };

    const handleChange = (e) => {
        setEditedRoom({ ...editedRoom, [e.target.name]: e.target.value });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Update Rooms</Typography>
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
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((room) => (
                        <TableRow key={room.room_id}>
                            <TableCell>
                                {room.room_id}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <TextField 
                                        name="hotel_id"
                                        value={editedRoom.hotel_id}
                                        onChange={handleChange}
                                        fullWidth
                                    /> : 
                                    room.hotel_id}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <TextField 
                                        name="room_number"
                                        value={editedRoom.room_number}
                                        onChange={handleChange}
                                        fullWidth
                                    /> : 
                                    room.room_number}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <TextField 
                                        name="price"
                                        value={editedRoom.price}
                                        onChange={handleChange}
                                        fullWidth
                                    /> : 
                                    room.price}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <TextField 
                                        name="capacity"
                                        value={editedRoom.capacity}
                                        onChange={handleChange}
                                        fullWidth
                                    /> : 
                                    room.capacity}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <TextField 
                                        name="view"
                                        value={editedRoom.view}
                                        onChange={handleChange}
                                        fullWidth
                                    /> : 
                                    room.view}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <TextField 
                                        name="damages"
                                        value={editedRoom.damages}
                                        onChange={handleChange}
                                        fullWidth
                                    /> : 
                                    room.damages}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <TextField 
                                        name="extendable"
                                        value={editedRoom.extendable}
                                        onChange={handleChange}
                                        fullWidth
                                    /> : 
                                    String(room.extendable)}
                            </TableCell>
                            <TableCell>
                                {isEditing(room.room_id) ? 
                                    <>
                                        <IconButton onClick={handleSaveEdit} color="primary">
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={handleCancelEdit} color="secondary">
                                            <CancelIcon />
                                        </IconButton>
                                    </> :
                                    <IconButton onClick={() => handleEdit(room)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </TableContainer>
    );
}

export default UpdateRooms;
