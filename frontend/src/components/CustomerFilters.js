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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

const defaultTheme = createTheme();

export default function Filters() {
 const navigate = useNavigate();
 const [priceRange, setPriceRange] = React.useState(400); // Initial value for price range slider
 const [rating, setRating] = React.useState(''); // Default to empty string
 const [dates, setDates] = React.useState(''); // Default to empty string
 const [dates2, setDates2] = React.useState(''); // Default to empty string
 const [city, setCity] = React.useState(''); // Default to empty string
 const [roomView, setRoomView] = React.useState(''); // Default to empty string
 const [chain_id, setChain] = React.useState(''); // Default to empty string
 const [people, setPeople] = React.useState(''); // Default to empty string
 const [hotelData, setHotelData] = React.useState([]);



 const [error, setError] = React.useState(false); // New state to track error
 const [errors, setErrors] = React.useState({}); // New state to track errors


 const processedData = hotelData.reduce((acc, curr) => {
  const chainIndex = acc.findIndex(chain => chain.chain_id === curr.chain_id);
  if (chainIndex === -1) {
    acc.push({
      chain_id: curr.chain_id,
      hotels: [{
        hotel_id: curr.hotel_id,
        name: curr.name,
        address: curr.address,
        rating: curr.rating,
        city: curr.city,
        rooms: [curr], // Assuming curr represents a room
        views: [curr]
      }]
    });

  } else {
    const hotelIndex = acc[chainIndex].hotels.findIndex(hotel => hotel.hotel_id === curr.hotel_id);
    if (hotelIndex === -1) {
      acc[chainIndex].hotels.push({
        hotel_id: curr.hotel_id,
        name: curr.name,
        address: curr.address,
        rating: curr.rating,
        city: curr.city,
        rooms: [curr], // Assuming curr represents a room
        views: [curr]
      });
    } else {
      acc[chainIndex].hotels[hotelIndex].rooms.push(curr); // Assuming curr represents a room
    }
  }
  return acc;
}, []);


 const handleSubmit = async (event) => {
  event.preventDefault();
  const queryParams = new URLSearchParams();

  const newErrors = {};

  // Check each field for its value and update the errors state accordingly
  if (!city) newErrors.city = true;
  if (!rating) newErrors.rating = true;
  if (!dates) newErrors.dates = true;
  if (!dates2) newErrors.dates2 = true;
  if (!roomView) newErrors.roomView = true;
  if (!chain_id) newErrors.chain_id = true;
  if (!people) newErrors.people = true;

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {

    if (city) queryParams.append('city', city);
    if (rating) queryParams.append('rating', rating);
    if (dates) queryParams.append('dates', dates);
    if (dates2) queryParams.append('dates2', dates2);
    if (roomView) queryParams.append('roomView', roomView);
    if (chain_id) queryParams.append('chain_id', chain_id);
    if (people) queryParams.append('people', people)

    // Convert URLSearchParams object to a JSON object
    const paramsObject = Object.fromEntries(queryParams.entries());

    // Now you can access individual values in the JSON object
    console.log("Submitted Filters:")
    console.log("City: " + paramsObject.city || "All");
    //console.log("Price: " + paramsObject.priceRange || "All");
    console.log("Rating: " + paramsObject.rating || "All");
    console.log("Dates: " + paramsObject.dates + " to " + paramsObject.dates2 || "All");
    console.log("View: " + paramsObject.roomView || "All");
    console.log("Chain: " + paramsObject.chain || "All");
    console.log("People : " + paramsObject.people || "All");

    const filters = {
      address:paramsObject.city,
      rating:paramsObject.rating,
      chain_id:paramsObject.chain_id,
      capacity:paramsObject.people,
      view:paramsObject.roomView,
      date1:paramsObject.dates,
      date2:paramsObject.dates2
   };

   console.log(filters)
  
   // Construct the URL with query parameters
   const url = new URL('http://localhost:5000/filter-hotels');
   console.log(filters)
   Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]));
  
   try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data); // Process the returned data
      setHotelData(data)

      
   } catch (error) {
      console.error('Error fetching data:', error);
   }

  }    
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
              <MenuItem value="1">1-star</MenuItem>
              <MenuItem value="2">2-star</MenuItem>
              <MenuItem value="3">3-star</MenuItem>
              <MenuItem value="4">4-star</MenuItem>
              <MenuItem value="5">5-star</MenuItem>
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
              <MenuItem value="mountain">CityA</MenuItem>
              <MenuItem value="sea">CityB</MenuItem>
              <MenuItem value="mountain">CityC</MenuItem>
              <MenuItem value="sea">CityD</MenuItem>
            </TextField>





          
          </Box>




          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>


          <TextField
            label="Room View"
            select
            variant="outlined"
            value={roomView}
            onChange={(event) => setRoomView(event.target.value)}
            size="small"
            sx={{ width: '200px' }}
            error={errors.roomView}
            helperText={errors.roomView && "Please select a view."}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="mountain">Mountain</MenuItem>
            <MenuItem value="sea">Sea</MenuItem>
          </TextField>



          <TextField
              label="Chain"
              select
              variant="outlined"
              value={chain_id}
              onChange={(event) => setChain(event.target.value)}
              size="small"
              sx={{ width: '200px' }}
              error={errors.chain_id}
              helperText={errors.chain_id && "Please select a chain."}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
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
              <MenuItem value="2">2+</MenuItem>
              <MenuItem value="3">3+</MenuItem>
              <MenuItem value="4">4+</MenuItem>
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
        {/* Display the filtered results */}
        <div>
      <Typography variant="h6" gutterBottom>
        Showing available rooms from {dates} to {dates2}
      </Typography>
      {processedData.map(chain => (
        <div key={chain.chain_id}>
          <Typography variant="h5">Chain ID: {chain.chain_id}</Typography>
          {chain.hotels.map(hotel => (
            <Box key={hotel.hotel_id} sx={{ ml: 2 }}>
              <Typography variant="h6">Hotel ID: {hotel.hotel_id}, Name: {hotel.name}, City: {hotel.address}</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Room Number</TableCell>
                      <TableCell>Capacity</TableCell>
                      <TableCell>View</TableCell>
                      <TableCell>Price</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hotel.rooms.map(room => (
                      <TableRow key={room.room_number}>
                        <TableCell>{room.room_number}</TableCell>
                        <TableCell>{room.capacity}</TableCell>
                        <TableCell>{room.view}</TableCell>
                        <TableCell>{room.price}</TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))}
        </div>
      ))}
    </div>

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