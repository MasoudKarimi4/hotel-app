// important
import * as React from 'react';
import { useNavigate } from 'react-router-dom';


// mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function SignIn() {

  // navigate is how you go to other pages 
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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

          <h1 style={{ fontSize: '5rem' }}>Hotel App</h1>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

            
            <Button
              type="button" // Change type to "button" to prevent form submission
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => navigate('/create-account')} // Add this line
              >
              Make an Account
              </Button>
            
                <Button
                type="button" // Change type to "button" to prevent form submission
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => navigate('/customer-app')} // Add this line
                >
                Customer Panel 
                </Button>
              <Button
                type="button" // Change type to "button" to prevent form submission
                fullWidth
                variant="contained"
                sx={{ mb: 2 }}
                onClick={() => navigate('/employee-app')} // Add this line
                >
                Employee Panel 
                </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
               
       
              </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}