


/////
/////
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const CreateCustomer = () => {
 const navigate = useNavigate();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [address, setAddress] = useState('');
 const [nameError, setNameError] = useState('');
 const [emailError, setEmailError] = useState('');
 const [addressError, setAddressError] = useState('');
 const [successMessage, setSuccessMessage] = useState(''); // New state for success message

 const onSubmitForm = async (e) => {
    e.preventDefault();

    // Reset error messages and success message
    setNameError('');
    setEmailError('');
    setAddressError('');
    setSuccessMessage('');

    // Validation and submission logic...
    if (!name) {
      setNameError('Name is required.');
    }
    if (!email) {
      setEmailError('Email is required.');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError('Invalid email address.');
    }
    if (!address) {
      setAddressError('Address is required.');
    }

    if (!nameError && !emailError && !addressError) {
      try {
        const body = { name, email, address };
        console.log('Request body:', body);

        const response = await fetch("http://localhost:5000/createcustomer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });

        if (!response.ok) {
            // Error handling...
        } else {
            setSuccessMessage('Account created successfully!');
          //  navigate('/success');
        }
      } catch (err) {
        console.error(err.message);
        // Handle other errors as needed
      }
    }
 };

 return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h2">
            Hotel App
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Customer Account
          </Typography>
          {successMessage && <p>{successMessage}</p>} {/* Display success message */}
         
            
            <Box
            component="form"
            onSubmit={onSubmitForm}
            noValidate
            sx={{ mt: 1 }}
            style={{ width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!addressError}
              helperText={addressError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Customer Account
            </Button>

            <Button
              type="button" // Change type to "button" to prevent form submission
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => navigate('/')} // Add this line
              >
              Go to Sign In
              </Button>



          </Box>
        </Box>
      </Container>
    </ThemeProvider>
 );
};

export default CreateCustomer;
