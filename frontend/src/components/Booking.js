import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const Booking = ({ formData, handleChange }) => {
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Assuming `formData` includes `customer_id`, `room_id`, `check_in_date`, and `check_out_date`
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customer_id: formData.ssn, // Assuming the `ssn` field from your formData should be used as `customer_id`
            room_id: formData.roomId, // You need to make sure this data is included in your form data
            check_in_date: formData.checkInDate,
            check_out_date: formData.checkOutDate,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Booking successful:', data);
        // Here you might want to redirect the user or show a success message
    })
    .catch((error) => {
        console.error('Error:', error);
        // Here you might want to show an error message
    });
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="paymentInfo"
          label="Payment Information"
          name="paymentInfo"
          value={formData.paymentInfo}
          onChange={handleChange}
          helperText="Payment card number, expiry date, etc."
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
