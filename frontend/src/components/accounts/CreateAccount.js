import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

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

export default function EmployeeApp() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalEntity, setModalEntity] = useState('');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (modalEntity === 'customers') {
            fetchCustomers();
        }
    }, [modalEntity, isModalOpen]);

    const handleAction = (entity, action) => {
      console.log('Entity:', entity, 'Action:', action); // Debugging log
      setModalEntity(entity);
      if (entity === 'customers') {
          if (action === 'insert') {
              setModalOpen(true);
          } else if (action === 'delete') {
              fetchCustomers().then(() => console.log('Fetched customers:', customers));
          }
      } else {
          console.log(`${action} for ${entity}`);
          // Handle other actions here
      }
  };
  

  const fetchCustomers = async () => {
    try {
        const response = await fetch('http://localhost:5000/allcustomers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
        console.log('Customers fetched:', data); // Debugging log
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
};


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
                    alert("SSN already exists in the database.");
                } else {
                    throw new Error('Server error');
                }
            } else {
                const customer = await response.json();
                alert("Customer added successfully");
            }
        } catch (error) {
            console.error('Failed to insert customer:', error);
        }
    };

    const handleDeleteCustomer = async (ssn) => {
        try {
            const response = await fetch(`http://localhost:5000/deletecustomer/${ssn}`, { method: 'DELETE' });
            if (response.ok) {
                alert("Customer deleted successfully.");
                setCustomers(customers.filter(customer => customer.ssn !== ssn));
            } else {
                alert('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleModalClose = () => setModalOpen(false);

    return (
        <Paper style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Employee Management Panel</Typography>
            <Grid container spacing={3}>
                {['customers', 'employees', 'hotels', 'rooms'].map((entity) => (
                    <Grid item xs={12} sm={6} md={3} key={entity}>
                        <Typography variant="h6" style={{ textTransform: 'capitalize' }}>{entity}</Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" onClick={() => handleAction(entity, 'insert')}>Insert {entity}</Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleAction(entity, 'delete')}>Delete {entity}</Button>
                            <Button variant="contained" color="primary" onClick={() => handleAction(entity, 'update')}>Update {entity}</Button>
                        </div>
                    </Grid>
                ))}
            </Grid>
            {modalEntity === 'customer' && (
                <InsertCustomerModal open={isModalOpen} onClose={handleModalClose} onSubmit={handleInsertCustomer} />
            )}
            {modalEntity === 'customers' && customers.map((customer) => (
                <div key={customer.ssn} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <Typography>{`${customer.name} (SSN: ${customer.ssn})`}</Typography>
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteCustomer(customer.ssn)}>Delete</Button>
                </div>
            ))}
        </Paper>
    );
}
