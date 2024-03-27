import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function CustomerApp() {
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel App
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link color="inherit" onClick={() => navigate('/')}>Home</Link>
            <Link color="inherit" onClick={() => navigate('/about')}>About</Link>
            <Link color="inherit" onClick={() => navigate('/contact')}>Contact</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Hotel App
          </Typography>
          {/* Your JSX content for the editing page goes here */}
        </Box>
      </Container>
    </ThemeProvider>
 );
}
