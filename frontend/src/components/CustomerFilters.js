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
 const [city, setCity] = React.useState('');
 const [rating, setRating] = React.useState('');
 const [dates, setDates] = React.useState('');
 const [roomView, setRoomView] = React.useState('');
 const [chain, setChain] = React.useState('');

 const handleSubmit = (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams({
      city: city,
      priceRange: priceRange,
      rating: rating,
      dates: dates,
      roomView: roomView,
      chain: chain,
    })
  
    // Convert URLSearchParams object to a JSON object
    const paramsObject = Object.fromEntries(queryParams.entries());
  
    // Now you can access individual values in the JSON object
    console.log("City: " + paramsObject.city);
    console.log("Price: " +paramsObject.priceRange);
    console.log("Rating: " +paramsObject.rating);
    console.log("Dates: " +paramsObject.dates);
    console.log("View: " +paramsObject.roomView);
    console.log("Chain: " +paramsObject.chain);

    // Construct the URL with the query parameters
    // const url = `https://your-api-endpoint.com/search?${queryParams}`;
    // console.log(url);
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
              value={rating}
              onChange={(event) => setRating(event.target.value)}
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
              value={dates}
              onChange={(event) => setDates(event.target.value)}
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
              value={city}
              onChange={(event) => setCity(event.target.value)}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Room View"
              select
              variant="outlined"
              value={roomView}
              onChange={(event) => setRoomView(event.target.value)}
              size="small"
              sx={{ width: '200px' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="mountain">Mountain</MenuItem>
              <MenuItem value="sea">Sea</MenuItem>
            </TextField>
            <TextField
              label="Chain"
              select
              variant="outlined"
              value={chain}
              onChange={(event) => setChain(event.target.value)}
              size="small"
              sx={{ width: '200px' }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="chain1">1</MenuItem>
              <MenuItem value="chain2">2</MenuItem>
              <MenuItem value="chain3">3</MenuItem>
              <MenuItem value="chain4">4</MenuItem>
              <MenuItem value="chain5">5</MenuItem>
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
 );
}
