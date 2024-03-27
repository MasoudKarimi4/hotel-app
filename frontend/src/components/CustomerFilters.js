import * as React from 'react';
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

const defaultTheme = createTheme();

export default function Filters() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = React.useState(100); // Initial value for price range slider

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="sm" sx={{ marginTop: '20px' }}>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Filter By
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <TextField
              label="Rating⭐"
              select
              variant="outlined"
              defaultValue=""
              size="small"
              sx={{ width: '200px' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1-star">1-star</MenuItem>
              <MenuItem value="2-star">2-star</MenuItem>
              <MenuItem value="3-star">3-star</MenuItem>
              <MenuItem value="4-star">4-star</MenuItem>
              <MenuItem value="5-star">5-star</MenuItem>
            </TextField>
            <TextField
              label="Dates"
              type="date"
              defaultValue=""
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: '200px' }}
            />
            <TextField
              label="City"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Room View"
              select
              variant="outlined"
              defaultValue=""
              size="small"
              sx={{ width: '200px' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </TextField>

                <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="price-range-slider"
                min={0}
                max={100}
                sx={{ width: '200px' }}
              />

            <Button variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
 );
}
