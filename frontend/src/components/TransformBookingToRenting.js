import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
  Typography, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setSnackbar({ open: true, message: 'Failed to fetch bookings', severity: 'error' });
      }
    };

    fetchBookings();
  }, []);

  const handleOpenDialog = (bookingId) => {
    setSelectedBookingId(bookingId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEmployeeId('');
  };

  const handleTransform = async () => {
    if (!employeeId) {
      setSnackbar({ open: true, message: 'Employee ID is required', severity: 'warning' });
      return;
    }

    console.log(`Transforming booking ID ${selectedBookingId} with employee ID ${employeeId}`); // Log the employee ID


    try {
      const response = await fetch(`http://localhost:5000/api/transform-booking/${selectedBookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId }),
      });

      if (!response.ok) throw new Error('Failed to transform booking');

      const data = await response.json();
      setSnackbar({ open: true, message: 'Successfully transformed to renting', severity: 'success' });

      // Update the bookings list to reflect the change
      setBookings(bookings.filter(booking => booking.booking_id !== selectedBookingId));
    } catch (error) {
      console.error('Error transforming booking:', error);
      setSnackbar({ open: true, message: 'Failed to transform booking', severity: 'error' });
    }

    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" align="center" margin={2}>
          Bookings
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Room ID</TableCell>
              <TableCell>Date of Booking</TableCell>
              <TableCell>Check-In Date</TableCell>
              <TableCell>Check-Out Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.booking_id}>
                <TableCell>{booking.booking_id}</TableCell>
                <TableCell>{booking.customer_id}</TableCell>
                <TableCell>{booking.room_id}</TableCell>
                <TableCell>{booking.date_of_booking}</TableCell>
                <TableCell>{booking.check_in_date}</TableCell>
                <TableCell>{booking.check_out_date}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(booking.booking_id)}
                  >
                    Transform
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Transform Booking to Renting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To transform this booking into a renting, please enter your employee ID.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Employee ID"
            fullWidth
            variant="standard"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleTransform}>Transform</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default BookingList;
