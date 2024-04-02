import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    rentingId: '',
    paymentDate: '',
    paymentInfo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rentingId: parseInt(formData.rentingId),
          paymentDate: formData.paymentDate,
          paymentInfo: formData.paymentInfo
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message); // Display the error message
      } else {
        alert('Payment submitted successfully');
        // Clear the form after successful submission
        setFormData({ rentingId: '', paymentDate: '', paymentInfo: '' });
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('Failed to submit payment');
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Payment Information
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="rentingId"
          label="Renting ID"
          name="rentingId"
          type="number"
          value={formData.rentingId}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="paymentDate"
          label="Payment Date"
          name="paymentDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.paymentDate}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="paymentInfo"
          label="Payment Info"
          name="paymentInfo"
          placeholder="e.g., Credit Card, Bank Transfer, PayPal"
          multiline
          rows={4}
          value={formData.paymentInfo}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Payment
        </Button>
      </form>
    </Container>
  );
};

export default PaymentForm;
