import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function CreateAccount() {
 const [selectedOption, setSelectedOption] = React.useState('');

 const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      option: data.get('option'),
    });
 };

 const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
 };

 return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: '5rem' }}>Hotel App</h1>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            select
            fullWidth
            margin="normal"
            required
            name="option"
            label=""
            SelectProps={{
                native: true,
                fullWidth: true,
                margin: 'normal'
            }}
            value={selectedOption}
            onChange={handleOptionChange}
            >
            <option value="">Select an option</option>
            <option value="customer">Customer</option>
            <option value="employee">Employee</option>
            </TextField>
            {selectedOption === 'customer' && (
              <div>
                {/* Customer specific fields */}
                <TextField
                 margin="normal"
                 fullWidth
                 name="customerField"
                 label="Name"
                 type="text"
                 id="customerField"
                />

                <TextField
                 margin="normal"
                 fullWidth
                 name="customerField"
                 label="Address"
                 type="text"
                 id="customerField"
                />

                <TextField
                 margin="normal"
                 fullWidth
                 name="customerField"
                 label="Email"
                 type="text"
                 id="customerField"
                />





                <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                >
                 Submit as Customer
                </Button>
              </div>
            )}
            {selectedOption === 'employee' && (
              <div>
                {/* Employee specific fields */}
                <TextField
                 margin="normal"
                 fullWidth
                 name="employeeName"
                 label="Name"
                 type="text"
                 id="employeeField"
                />

                <TextField
                 margin="normal"
                 fullWidth
                 name="employeeSin"
                 label="Sin"
                 type="text"
                 id="employeeField"
                />

                <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
                >
                 Submit as Employee
                </Button>
              </div>
            )}
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
 );
}
