import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, TextField, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function UpdateEmployees() {
    const [employees, setEmployees] = useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({});
    const isEditing = (id) => editingEmployeeId === id;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/employees'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);
    
    const handleEdit = (employee) => {
        setEditingEmployeeId(employee.employee_id);
        setEditedEmployee({ ...employee });
    };

    const handleCancelEdit = () => {
        setEditingEmployeeId(null);
        setEditedEmployee({});
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees/${editingEmployeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedEmployee),
            });
    
            if (!response.ok) {
                // If the backend response is not ok, throw an error
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update employee');
            }
    
            const updatedEmployeeData = await response.json();
    
            // Update the local state to reflect the changes in the UI
            setEmployees(employees.map((employee) => (
                employee.employee_id === editingEmployeeId ? updatedEmployeeData : employee
            )));
    
            // Reset the editing state
            handleCancelEdit();
    
        } catch (error) {
            console.error('Failed to update employee:', error);
            // Handle errors here, such as displaying a notification to the user
        }
    };
    

    const handleChange = (e) => {
        setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Update Employees</Typography>
            <Table>
            <TableHead>
                
    <TableRow>
        <TableCell>Employee ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>SIN</TableCell>
        <TableCell>Hotel ID</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Actions</TableCell>
    </TableRow>
</TableHead>
<TableBody>
    {employees.map((employee) => (
        <TableRow key={employee.employee_id}>
            <TableCell>{employee.employee_id}</TableCell>
            <TableCell>
                {isEditing(employee.employee_id) ? 
                    <TextField 
                        name="name"
                        value={editedEmployee.name}
                        onChange={handleChange}
                        fullWidth
                    /> : 
                    employee.name}
            </TableCell>
            <TableCell>
                {isEditing(employee.employee_id) ? 
                    <TextField 
                        name="sin"
                        value={editedEmployee.sin}
                        onChange={handleChange}
                        fullWidth
                    /> : 
                    employee.sin}
            </TableCell>
            <TableCell>
                {isEditing(employee.employee_id) ? 
                    <TextField 
                        name="hotel_id"
                        value={editedEmployee.hotel_id}
                        onChange={handleChange}
                        fullWidth
                    /> : 
                    employee.hotel_id}
            </TableCell>
            <TableCell>
                {isEditing(employee.employee_id) ? 
                    <TextField 
                        name="role"
                        value={editedEmployee.role}
                        onChange={handleChange}
                        fullWidth
                    /> : 
                    employee.role}
            </TableCell>
            <TableCell>
                {isEditing(employee.employee_id) ? 
                    <>
                        <IconButton onClick={handleSaveEdit} color="primary">
                            <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit} color="secondary">
                            <CancelIcon />
                        </IconButton>
                    </> :
                    <IconButton onClick={() => handleEdit(employee)} color="primary">
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

export default UpdateEmployees;
