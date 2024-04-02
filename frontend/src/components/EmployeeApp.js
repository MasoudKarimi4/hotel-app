import React, { useState } from 'react';
import { Button, Grid, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField,FormControlLabel,Checkbox,Box, Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';




function InsertRentingModal({ open, onClose, onSubmit }) {
  const [renting, setRenting] = useState({
    customer_id: '', employee_id: '', room_id: '', start_date: '', end_date: ''
  });

  const handleChange = (e) => {
    setRenting({ ...renting, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(renting);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Renting</DialogTitle>
      <DialogContent>
        <TextField name="customer_id" label="Customer ID" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="employee_id" label="Employee ID" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="room_id" label="Room ID" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="start_date" label="Start Date" type="date" onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField name="end_date" label="End Date" type="date" onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}





function InsertCustomerModal({ open, onClose, onSubmit }) {
  const [customer, setCustomer] = useState({
    ssn: '', name: '', address: '', email: '', date_of_registration: ''
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(customer);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Customer</DialogTitle>
      <DialogContent>
        <TextField name="ssn" label="SSN" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="name" label="Name" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="address" label="Address" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="email" label="Email" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="date_of_registration" label="Date of Registration" type="date" onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

function InsertEmployeeModal({ open, onClose, onSubmit }) {
    const [employee, setEmployee] = useState({
      employee_id: '', name: '', sin: '', hotel_id: '', role: ''
    });
  
    const handleChange = (e) => {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      onSubmit(employee);
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField name="employee_id" label="Employee ID" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="name" label="Name" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="sin" label="SIN" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="hotel_id" label="Hotel ID" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="role" label="Role" onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }

  function InsertHotelModal({ open, onClose, onSubmit }) {
    const [hotel, setHotel] = useState({
      name: '', chain_id: '', rating: '', manager_id: '', num_rooms: '', address: '', phone_number: ''
    });
  
    const handleChange = (e) => {
      setHotel({ ...hotel, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async () => {
      try {
          const response = await onSubmit(hotel);
          if (!response.ok) {
              const errorData = await response.json();
              alert(errorData.message); // Show error dialog
              onClose();
          } else {
              alert('Hotel added successfully!'); // Show success dialog
              onClose();
          }
      } catch (error) {
          console.error('Failed to insert hotel:', error);
          alert('An error occurred while adding the hotel.'); // Show error dialog
      }
  };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Hotel</DialogTitle>
        <DialogContent>
          <TextField name="name" label="Hotel Name" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="chain_id" label="Chain ID" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="rating" label="Rating" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="manager_id" label="Manager ID" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="num_rooms" label="Number of Rooms" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="address" label="Address" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="phone_number" label="Phone Number" onChange={handleChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const handleInsertHotel = async (hotelData) => {
    try {
        const response = await fetch('http://localhost:5000/api/hotels', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hotelData),
        });
        return response; 
        
    } catch (error) {
        console.error('Failed to insert hotel:', error);
        // Handle error here
    }
};

  
  





export default function EmployeeApp() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalEntity, setModalEntity] = useState('');
  const navigate = useNavigate();

  const handleInsertEmployee = async (employeeData) => {
    try {
        const response = await fetch('http://localhost:5000/api/employee', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            throw new Error('Failed to add employee');
        }

        const addedEmployee = await response.json();
        // Update the state or UI as needed, e.g., refresh employee list
    } catch (error) {
        console.error('Failed to insert employee:', error);
        // Handle errors, e.g., show an alert or notification
    }
};




function InsertRoomModal({ open, onClose, onSubmit }) {
  const [room, setRoom] = useState({
    hotel_id: '',
    room_number: '',
    price: '',
    capacity: '',
    view: '',
    damages: '',
    extendable: false, 
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoom({
      ...room,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await onSubmit(room);
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
      } else {
        alert('Room added successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Failed to insert room:', error);
      alert('An error occurred while adding the room.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Room</DialogTitle>
      <DialogContent>
        <TextField name="hotel_id" label="Hotel ID" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="room_number" label="Room Number" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="price" label="Price" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="capacity" label="Capacity" type="number" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="view" label="View" onChange={handleChange} fullWidth margin="normal" />
        <TextField name="damages" label="Damages" onChange={handleChange} fullWidth margin="normal" />
        <FormControlLabel
          control={<Checkbox checked={room.extendable} onChange={handleChange} name="extendable" />}
          label="Extendable"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

// Add this new function in your EmployeeApp component
const handleInsertRoom = async (roomData) => {
  const response = await fetch('http://localhost:5000/api/rooms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData),
  });

  return response;
};

const [isCreateRentingOpen, setCreateRentingOpen] = useState(false);
  
  const handleOpenCreateRenting = () => {
    setCreateRentingOpen(true);
  };

  const handleCloseCreateRenting = () => {
    setCreateRentingOpen(false);
  };

  const handleInsertRenting = async (rentingData) => {
    try {
      const response = await fetch('http://localhost:5000/api/renting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rentingData)
      });
  
      if (response.ok) {
        // If the response is OK, show success message
        alert('Renting added successfully!');
      } else if (response.status === 400) {
        // Handle specific errors like invalid IDs
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      } else {
        // Handle other server errors
        throw new Error('Failed to add renting');
      }
    } catch (error) {
      console.error('Failed to insert renting:', error);
      alert(`Failed to add renting: ${error.message}`);
    }
  };
  
  





const handleAction = (entity, action) => {
  if (entity === 'customers' || entity === 'employees' || entity === 'hotels' || entity === 'rooms') {
    switch (action) {
      case 'insert':
        setModalEntity(entity);
        setModalOpen(true);
        break;
      case 'delete':
        navigate(`/employee-app/delete-${entity}`);
        break;
      case 'update':
        navigate(`/employee-app/update-${entity}`);
        break;
      default:
        console.log(`${action} for ${entity}`);
    }
  } else if (entity === 'hotels') {
    if (action === 'insert') {
      setModalEntity('hotels');
      setModalOpen(true);
    }
    // ... handle delete and update for hotels here ...
  } else {
    console.log(`${action} for ${entity}`);
    // Handle other entities' actions here
  }
}



  const handleModalClose = () => setModalOpen(false);

  const handleInsertCustomer = async (customerData) => {

    if (!Number.isInteger(parseInt(customerData.ssn))) {
      alert("SSN must be an integer");
      return;
    }

    try {
        const response = await fetch('http://localhost:5000/addcustomer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) {
            if (response.status === 409) {
                // Conflict error - SSN already exists
                alert("SSN already exists in the database.");
            } else {
                throw new Error('Server error');
            }
        } else {
            // Handle success
            const customer = await response.json();
            // Display success message or update state
        }
        // Handle success here
    } catch (error) {
        console.error('Failed to insert customer:', error);
        // Handle error here
    }
};

const handleViewRoomsByArea = () => {
  // Navigate to the view for available rooms per area
  navigate('/view-rooms-by-area');
};

const handleViewRoomCapacityByHotel = () => {
  // Navigate to the view for room capacity by hotel
  navigate('/view-room-capacity-by-hotel');
};

 const handleTransformBookingToRenting = () => {
    // Navigate to the page for transforming booking to renting
    navigate('/transform-booking-to-renting');
  };

  
 
  const [formData, setFormData] = useState({
    rentingId: '',
    paymentDate: '',
    paymentInfo: ''
  });

  // Handler for form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit form data to your backend
    // Implement the fetch request here
  };






  return (
    <Paper style={{ padding: '20px', margin: '20px', borderRadius: '8px' }}>
      <Box style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant="h2" style={{ fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700 }}>
          Employee Management Panel
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={5}>
          <Box
            boxShadow={3}
            borderRadius={2}
            p={3}
            mb={4}
            style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}
          >
            <Typography variant="h6" textAlign="center" gutterBottom>
              Booking to Renting
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleTransformBookingToRenting}
              style={{ boxShadow: 'none' }}
            >
              Transform Booking to Renting
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            boxShadow={3}
            borderRadius={2}
            p={3}
            mb={4}
            style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}
          >
            <Typography variant="h6" textAlign="center" gutterBottom>
              Create Renting
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleOpenCreateRenting}
              style={{ boxShadow: 'none' }}
            >
              Create Renting
            </Button>
            
            
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {['customers', 'employees', 'hotels', 'rooms'].map((entity) => (
          <Grid item xs={12} sm={6} md={3} key={entity}>
            <Typography variant="h6" style={{ textTransform: 'capitalize' }}>{entity}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <Button variant="outlined" color="primary" onClick={() => handleAction(entity, 'insert')}>
                Insert {entity}
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleAction(entity, 'delete')}>
                Delete {entity}
              </Button>
              <Button variant="contained" color="primary" onClick={() => handleAction(entity, 'update')}>
                Update {entity}
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 4 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleViewRoomsByArea}>
            View Available Rooms Per Area
          </Button>
          <Button variant="contained" color="secondary" onClick={handleViewRoomCapacityByHotel}>
            View Room Capacity in Hotel
          </Button>
        </Stack>
      </Box>
      {modalEntity === 'customers' && (
        <InsertCustomerModal open={isModalOpen} onClose={handleModalClose} onSubmit={handleInsertCustomer} />
      )}
      {modalEntity === 'employees' && (
                <InsertEmployeeModal 
                    open={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={handleInsertEmployee}
                />
            )}
      {modalEntity === 'hotels' && (
      <InsertHotelModal 
        open={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleInsertHotel}
      />
    )}
    {modalEntity === 'rooms' && (
  <InsertRoomModal
    open={isModalOpen}
    onClose={handleModalClose}
    onSubmit={handleInsertRoom}
  />
)}
{isCreateRentingOpen && (
        <InsertRentingModal open={isCreateRentingOpen} onClose={handleCloseCreateRenting} onSubmit={handleInsertRenting} />
      )}

<PaymentForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>

            
    </Paper>
    
  );
}