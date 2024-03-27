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
 const [rating, setRating] = React.useState(''); // Default to empty string
 const [dates, setDates] = React.useState(''); // Default to empty string
 const [dates2, setDates2] = React.useState(''); // Default to empty string
 const [city, setCity] = React.useState(''); // Default to empty string
 const [roomView, setRoomView] = React.useState(''); // Default to empty string
 const [chain, setChain] = React.useState(''); // Default to empty string

 const [error, setError] = React.useState(false); // New state to track error
 const [errors, setErrors] = React.useState({}); // New state to track errors


 const handleSubmit = (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams();

    const newErrors = {};

    // Check each field for its value and update the errors state accordingly
    if (!city) newErrors.city = true;
    if (!rating) newErrors.rating = true;
    if (!dates) newErrors.dates = true;
    if (!dates2) newErrors.dates2 = true;
    if (!roomView) newErrors.roomView = true;
    if (!chain) newErrors.chain = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      if (city) queryParams.append('city', city);
      if (priceRange) queryParams.append('priceRange', priceRange);
      if (rating) queryParams.append('rating', rating);
      if (dates) queryParams.append('dates', dates);
      if (dates2) queryParams.append('dates2', dates2);
      if (roomView) queryParams.append('roomView', roomView);
      if (chain) queryParams.append('chain', chain);

      // Convert URLSearchParams object to a JSON object
      const paramsObject = Object.fromEntries(queryParams.entries());

      // Now you can access individual values in the JSON object
      console.log("City: " + paramsObject.city || "All");
      console.log("Price: " + paramsObject.priceRange || "All");
      console.log("Rating: " + paramsObject.rating || "All");
      console.log("Dates: " + paramsObject.dates + " to " + paramsObject.dates2 || "All");
      console.log("View: " + paramsObject.roomView || "All");
      console.log("Chain: " + paramsObject.chain || "All");
    }    



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
            {/* Rating TextField */}
            <TextField
              label="Rating⭐"
              select
              variant="outlined"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              size="small"
              sx={{ width: '200px' }}
              error={errors.rating}
              helperText={errors.rating && "Please select a rating."}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="1-star">1-star</MenuItem>
              <MenuItem value="2-star">2-star</MenuItem>
              <MenuItem value="3-star">3-star</MenuItem>
              <MenuItem value="4-star">4-star</MenuItem>
              <MenuItem value="5-star">5-star</MenuItem>
              </TextField>


              <TextField
              label="Start Date"
              type="date"
              value={dates}
              onChange={(event) => setDates(event.target.value)}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: '200px' }}
              error={errors.dates}
              helperText={errors.dates && "Please select a start date."}
            />


            <TextField
              label="End Date"
              type="date"
              value={dates2}
              onChange={(event) => setDates2(event.target.value)}
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: '200px' }}
              error={errors.dates2}
              helperText={errors.dates2 && "Please select an end date."}
            />
            {/* City TextField */}
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
            {/* Room View TextField */}
            <TextField
              label="Room View"
              select
              variant="outlined"
              value={roomView}
              onChange={(event) => setRoomView(event.target.value)}
              size="small"
              sx={{ width: '200px' }}
              error={errors.rating}
              helperText={errors.rating && "Please select a view."}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="mountain">Mountain</MenuItem>
              <MenuItem value="sea">Sea</MenuItem>
            </TextField>
            {/* Chain TextField */}
            <TextField
              label="Chain"
              select
              variant="outlined"
              value={chain}
              onChange={(event) => setChain(event.target.value)}
              size="small"
              sx={{ width: '200px' }}
              error={errors.chain}
              helperText={errors.chain && "Please select a chain."}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="chain1">1</MenuItem>
              <MenuItem value="chain2">2</MenuItem>
              <MenuItem value="chain3">3</MenuItem>
              <MenuItem value="chain4">4</MenuItem>
              <MenuItem value="chain5">5</MenuItem>
            </TextField>
            {/* Price Range Slider */}
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              aria-labelledby="price-range-slider"
              min={0}
              max={100}
              sx={{ width: '200px' }}
            />
            {/* Search Button */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
                        {/* Error message */}
                        {error && <p style={{ color: 'red' }}>Please select at least one option.</p>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
 );
}
