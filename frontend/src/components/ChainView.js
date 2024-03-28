import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const defaultTheme = createTheme();

export default function ChainView() {
  const navigate = useNavigate();
  const [chainsData, setChainsData] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-chains');
        console.log('Response from server:', response); // Log the response from the server
        const data = await response.json();

        console.log('Data from server:', data); // Log the parsed JSON data
        
        setChainsData(data.chainsById);
      } catch (error) {
        console.error('Error fetching chains data:', error);
      }
    };

    fetchData();
  }, []);

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

      <Container component="main" maxWidth="md" sx={{ marginTop: '20px' }}>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Hotel Chains
          </Typography>

          <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Chain ID</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(chainsData).map(([chainId, chain]) => (
                  <TableRow key={chainId}>
                    <TableCell>{chainId}</TableCell>
                    <TableCell>{chain.address}</TableCell>
                    <TableCell>{chain.email}</TableCell>
                    <TableCell>{chain.phone_number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
