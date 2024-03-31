import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const PaymentForm = ({ formData, handleChange, handleSubmit }) => {
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
          id="paymentDate"
          label="Payment Date"
          name="paymentDate"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
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
