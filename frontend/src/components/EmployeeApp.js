import React, { useState } from 'react';
import { Button, Grid, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


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


  const handleAction = (entity, action) => {
    if (entity === 'customers' || entity === 'employees') {
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
                // Handle other actions here
        }
    } else {
        console.log(`${action} for ${entity}`);
        // Handle other entities' actions here
    }
};



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





  return (
    <Paper style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Employee Management Panel</Typography>
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
    </Paper>
  );
}