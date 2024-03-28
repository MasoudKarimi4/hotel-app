import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

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
 const [people, setPeople] = React.useState(''); // Default to empty string


 const [error, setError] = React.useState(false); // New state to track error
 const [errors, setErrors] = React.useState({}); // New state to track errors

 const amenities = [
  { id: 1, name: 'Wi-Fi' },
  { id: 2, name: 'Pool' },
  { id: 3, name: 'Gym' },
  { id: 4, name: 'Free Parking' },
  { id: 5, name: 'Restaurant' },
 ];
 
 const [selectedAmenities, setSelectedAmenities] = React.useState([]);

 const handleChange = (event) => {
    setSelectedAmenities(event.target.value);
 };


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
    if (!people) newErrors.people = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      if (city) queryParams.append('city', city);
      if (priceRange) queryParams.append('priceRange', priceRange);
      if (rating) queryParams.append('rating', rating);
      if (dates) queryParams.append('dates', dates);
      if (dates2) queryParams.append('dates2', dates2);
      if (roomView) queryParams.append('roomView', roomView);
      if (chain) queryParams.append('chain', chain);
      if (people) queryParams.append('people', people)

      // Convert URLSearchParams object to a JSON object
      const paramsObject = Object.fromEntries(queryParams.entries());

      // Now you can access individual values in the JSON object
      console.log("Submitted Filters:")
      console.log("City: " + paramsObject.city || "All");
      console.log("Price: " + paramsObject.priceRange || "All");
      console.log("Rating: " + paramsObject.rating || "All");
      console.log("Dates: " + paramsObject.dates + " to " + paramsObject.dates2 || "All");
      console.log("View: " + paramsObject.roomView || "All");
      console.log("Chain: " + paramsObject.chain || "All");
      console.log("People : " + paramsObject.people || "All");

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

          <form onSubmit={handleSubmit}> {/* Wrap both sets of filters in a single form */}
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
              select
              variant="outlined"
              value={city}
              sx={{ width: '200px' }}
              onChange={(event) => setCity(event.target.value)}
              size="small"
              error={errors.city}
              helperText={errors.city && "Please select a city."}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="mountain">Mountain</MenuItem>
              <MenuItem value="sea">Sea</MenuItem>
              <MenuItem value="mountain">Mountain</MenuItem>
              <MenuItem value="sea">Sea</MenuItem>
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

          
          </Box>




          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>


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

            {/* Rating TextField */}
            <TextField
              label="Number of People"
              select
              variant="outlined"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
              size="small"
              sx={{ width: '200px' }}
              error={errors.people}
              helperText={errors.people && "Please select number of people."}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              </TextField>

          

            {/* Room View TextField */}





            {/* Search Button */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
                        {/* Error message */}
            {error && <p style={{ color: 'red' }}>Please select at least one option.</p>}
          </Box>



          </form>
        </Box>
      </Container>
    </ThemeProvider>
 );
}


/* 

(1, 'Free Wi-Fi'),
(2, 'Air Conditioning'),
(3, 'Mini Bar'),
(4, 'Ocean View'),
(5, 'Room Service'),
(6, 'Flat Screen TV'),
(7, 'Coffee Maker'),
(8, 'In-room Safe'),
(9, 'Daily Housekeeping'),
(10, 'Luxury Toiletries');




*/