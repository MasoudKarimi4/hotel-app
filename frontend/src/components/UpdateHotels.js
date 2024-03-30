import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TextField, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function UpdateHotels() {
    const [hotels, setHotels] = useState([]);
    const [editingHotelId, setEditingHotelId] = useState(null);
    const [editedHotel, setEditedHotel] = useState({});
    const isEditing = (id) => editingHotelId === id;

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/hotels');
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };
        fetchHotels();
    }, []);

    const handleEdit = (hotel) => {
        setEditingHotelId(hotel.hotel_id);
        setEditedHotel({ ...hotel });
    };

    const handleCancelEdit = () => {
        setEditingHotelId(null);
        setEditedHotel({});
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/hotels/${editingHotelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedHotel),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update hotel');
            }
    
            const updatedHotelData = await response.json();
            setHotels(hotels.map((hotel) => (
                hotel.hotel_id === editingHotelId ? updatedHotelData : hotel
            )));
            handleCancelEdit();
        } catch (error) {
            console.error('Failed to update hotel:', error);
        }
    };

    const handleChange = (e) => {
        setEditedHotel({ ...editedHotel, [e.target.name]: e.target.value });
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Update Hotels</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Hotel ID</TableCell>
                        <TableCell>Chain ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Manager ID</TableCell>
                        <TableCell>Number Of Rooms</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hotels.map((hotel) => (
                        <TableRow key={hotel.hotel_id}>
                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="hotel_id" value={editedHotel.hotel_id} onChange={handleChange} /> : hotel.hotel_id}</TableCell>
                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="chain_id" value={editedHotel.chain_id} onChange={handleChange} /> : hotel.chain_id}</TableCell>

                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="name" value={editedHotel.name} onChange={handleChange} /> : hotel.name}</TableCell>

                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="rating" value={editedHotel.rating} onChange={handleChange} /> : hotel.rating}</TableCell>
                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="manager_id" value={editedHotel.manager_id} onChange={handleChange} /> : hotel.manager_id}</TableCell>
                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="num_rooms" value={editedHotel.num_rooms} onChange={handleChange} /> : hotel.num_rooms}</TableCell>
                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="address" value={editedHotel.address} onChange={handleChange} /> : hotel.address}</TableCell>
                            <TableCell>{isEditing(hotel.hotel_id) ? <TextField name="phone_number" value={editedHotel.phone_number} onChange={handleChange} /> : hotel.phone_number}</TableCell>
                            <TableCell>
                                {isEditing(hotel.hotel_id) ? 
                                    <>
                                        <IconButton onClick={handleSaveEdit} color="primary">
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={handleCancelEdit} color="secondary">
                                            <CancelIcon />
                                        </IconButton>
                                    </> :
                                    <IconButton onClick={() => handleEdit(hotel)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UpdateHotels;
