import React, { useState, useEffect } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function DeleteEmployees() {
    const [employees, setEmployees] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

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
    

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const data = await response.json();
                if (response.status === 400) {
                    setDialogContent(data.message);
                    setOpenDialog(true);
                } else {
                    throw new Error(data.message || 'Failed to delete');
                }
            } else {
                setEmployees(employees.filter((employee) => employee.employee_id !== employeeId));

            }
        } catch (error) {
            console.error('Failed to delete employee:', error);
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

    return (
        <>
            <TableContainer component={Paper}>
                <Typography variant="h4" style={{ padding: '20px', textAlign: 'center' }}>Delete Employees</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* Define your employee table headers */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {employees.map((employee) => (
        <TableRow key={employee.employee_id}>
            <TableCell>{employee.employee_id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.sin}</TableCell>
            <TableCell>{employee.hotel_id}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell align="right">
                <IconButton onClick={() => handleDelete(employee.employee_id)} color="error">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    ))}
</TableBody>

                </Table>
            </TableContainer>
            <DialogBox />
        </>
    );
}

export default DeleteEmployees;
