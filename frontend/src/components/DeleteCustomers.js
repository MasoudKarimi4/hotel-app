import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DeleteCustomers() {
    const [customers, setCustomers] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');
    

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/customers'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 400) {
                    // Handle the specific case where bookings need to be deleted first
                    setDialogContent(data.message);
                    setOpenDialog(true);
                } else {
                    throw new Error(data.message);
                }
            } else {
                // Customer deleted successfully, update the state to remove the customer from the list
                setCustomers(customers.filter((customer) => customer.ssn !== customerId));
            }
        } catch (error) {
            console.error('Failed to delete customer:', error);
        }
    };

    const DialogBox = () => (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>{"Action Needed"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogContent}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );

    
    

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Delete Customers</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>SSN</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date of Registration</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.ssn}>
                                <TableCell component="th" scope="row">{customer.ssn}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.date_of_registration}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDelete(customer.ssn)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Customer deleted successfully!
                </Alert>
            </Snackbar>
            <DialogBox />
        </>
    );
}

export default DeleteCustomers;
