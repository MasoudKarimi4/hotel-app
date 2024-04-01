import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';

import Filters from './CustomerFilters';
import Booking from './Booking';
import PaymentForm from './PaymentForm';

const defaultTheme = createTheme();

export default function CustomerApp() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = React.useState(100); // Initial value for price range slider
  //for the payment
  const [paymentFormData, setPaymentFormData] = useState({
    paymentDate: '',
    paymentInfo: ''
  });
  const handlePaymentChange = (event) => {
    const { name, value } = event.target;
    setPaymentFormData({
      ...paymentFormData,
      [name]: value
    });
  };
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    // Here you would make a fetch request to your backend endpoint for payments
    // Assuming your API expects 'payment_rent_id', 'date_of_transaction', and 'payment_info'
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_rent_id: 5,
          date_of_transaction: paymentFormData.paymentDate,
          payment_info: paymentFormData.paymentInfo,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Payment successful:', data);
      // Handle success (e.g., showing a success message or clearing the form)
    } catch (error) {
      console.error('Payment submission error:', error);
      // Handle error (e.g., showing an error message)
    }
  };

  
  const [formData, setFormData] = React.useState({
    ssn: '',
    checkInDate: '',
    checkOutDate: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Here you can send the form data to your backend
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Customer Panel 
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              component="button"
              color="inherit"
              onClick={() => navigate('/')}
              sx={{
                textDecoration: 'none',
                color: '#fff',
                borderRadius: '5px',
                padding: '5px 10px',
                background: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  background: '#fff',
                  color: '#1976d2',
                }
              }}
            >
              Home
            </Link>
            <Link
              component="button"
              color="inherit"
              onClick={() => navigate('/customer-app')}
              sx={{
                textDecoration: 'none',
                color: '#fff',
                borderRadius: '5px',
                padding: '5px 10px',
                background: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  background: '#fff',
                  color: '#1976d2',
                }
              }}
            >
              Filter
            </Link>
            <Link
              component="button"
              color="inherit"
              onClick={() => navigate('/chains')}
              sx={{
                textDecoration: 'none',
                color: '#fff',
                borderRadius: '1px',
                padding: '5px 10px',
                background: 'transparent',
                cursor: 'pointer',
                '&:hover': {
                  background: '#fff',
                  color: '#1976d2',
                }
              }}
            >
              Chains
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      

      <Filters/>

      <Booking formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>

      
    </ThemeProvider>
  );
}
