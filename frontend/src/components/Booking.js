import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const Booking = ({ formData, handleChange }) => {
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error occurred while booking');
      }

      // Reset form data upon successful booking
      // You may implement further actions here, such as showing a success message
      handleChange({
        ssn: '',
        roomId: '',
        checkInDate: '',
        checkOutDate: ''
      });
    } catch (error) {
      console.error('Error booking:', error);
      // You may implement further error handling here, such as showing an error message to the user
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Make Booking
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="ssn"
          label="Customer SSN"
          name="ssn"
          value={formData.ssn}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="roomId"
          label="Room ID"
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="checkInDate"
          label="Check-In Date"
          name="checkInDate"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.checkInDate}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="checkOutDate"
          label="Check-Out Date"
          name="checkOutDate"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formData.checkOutDate}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Book Now
        </Button>
      </form>
    </Container>
  );
};

export default Booking;
