import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function ViewRoomCapacityPerHotel() {
    const [hotelCapacities, setHotelCapacities] = useState([]);

    useEffect(() => {
        const fetchHotelCapacities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/room-capacity-per-hotel');
                if (!response.ok) {
                    throw new Error('Failed to fetch hotel capacities');
                }
                const data = await response.json();
                setHotelCapacities(data);
            } catch (error) {
                console.error('Error fetching hotel capacities:', error);
            }
        };
    
        fetchHotelCapacities();
    }, []);
    

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Total Room Capacities per Hotel</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Hotel ID</TableCell>
                        <TableCell>Hotel Name</TableCell>
                        <TableCell>Total Capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hotelCapacities.map((hotel) => (
                        <TableRow key={hotel.hotel_id}>
                            <TableCell>{hotel.hotel_id}</TableCell>
                            <TableCell>{hotel.hotel_name}</TableCell>
                            <TableCell>{hotel.total_capacity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ViewRoomCapacityPerHotel;
