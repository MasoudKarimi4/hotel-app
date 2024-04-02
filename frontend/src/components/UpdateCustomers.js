import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TextField, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function UpdateCustomers() {
    const [customers, setCustomers] = useState([]);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [editedCustomer, setEditedCustomer] = useState({});
    const isEditing = (id) => editingCustomerId === id;


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
    

    const handleEdit = (customer) => {
        setEditingCustomerId(customer.ssn);
        setEditedCustomer({ ...customer });
    };

    const handleCancelEdit = () => {
        setEditingCustomerId(null);
        setEditedCustomer({});
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/customers/${editingCustomerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedCustomer),
            });
            if (!response.ok) {
                throw new Error('Failed to update customer');
            }
            setCustomers(customers.map((customer) => (
                customer.ssn === editingCustomerId ? editedCustomer : customer
            )));
            handleCancelEdit();
        } catch (error) {
            console.error('Failed to update customer:', error);
        }
    };

    const handleChange = (e) => {
        setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Update Customers</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>SSN</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Date of Registration</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.ssn}>
                            <TableCell>{customer.ssn}</TableCell>
                            <TableCell>
                                {isEditing(customer.ssn) ? 
                                    <TextField 
                                        name="name"
                                        value={editedCustomer.name}
                                        onChange={handleChange} 
                                    /> : customer.name}
                            </TableCell>
                            <TableCell>
                                {isEditing(customer.ssn) ? 
                                    <TextField 
                                        name="address"
                                        value={editedCustomer.address}
                                        onChange={handleChange} 
                                    /> : customer.address}
                            </TableCell>
                            <TableCell>
                                {isEditing(customer.ssn) ? 
                                    <TextField 
                                        name="email"
                                        value={editedCustomer.email}
                                        onChange={handleChange} 
                                    /> : customer.email}
                            </TableCell>
                            <TableCell>
                                {isEditing(customer.ssn) ? 
                                    <TextField 
                                        name="date_of_registration"
                                        type="date"
                                        value={editedCustomer.date_of_registration}
                                        onChange={handleChange} 
                                        InputLabelProps={{ shrink: true }}
                                    /> : customer.date_of_registration}
                            </TableCell>
                            <TableCell>
                                {isEditing(customer.ssn) ? 
                                    <>
                                        <IconButton onClick={handleSaveEdit} color="primary">
                                            <SaveIcon />
                                        </IconButton>
                                        <IconButton onClick={handleCancelEdit} color="secondary">
                                            <CancelIcon />
                                        </IconButton>
                                    </> :
                                    <IconButton onClick={() => handleEdit(customer)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default UpdateCustomers;
