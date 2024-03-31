import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function ViewRoomsByArea() {
    const [roomsByCity, setRoomsByCity] = useState([]);

    useEffect(() => {
        const fetchRoomsByCity = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/rooms-by-city');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setRoomsByCity(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRoomsByCity();
    }, []);

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Available Rooms per City</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Available Rooms</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roomsByCity.map((row) => (
                            <TableRow key={row.city}>
                                <TableCell component="th" scope="row">
                                    {row.city}
                                </TableCell>
                                <TableCell align="right">{row.available_rooms}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default ViewRoomsByArea;
