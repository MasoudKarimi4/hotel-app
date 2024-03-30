// Const is a variable that cannot be changed 


// Importing the required libraries / packages
// Express is the backend framework
// Cors is needed 
const express = require('express');
const app = express();
const cors = require('cors')
const pool = require("./db")

app.use(cors())
app.use(express.json())

// Routes //

// Add this new endpoint to your Express app

// POST endpoint for creating a new customer
app.post("/addcustomer", async (req, res) => {
    try {
        const { ssn, name, address, email, date_of_registration } = req.body;
        const newCustomerQuery = `
            INSERT INTO customer (ssn, name, address, email, date_of_registration) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const newCustomer = await pool.query(newCustomerQuery, [ssn, name, address, email, date_of_registration]);

        res.json(newCustomer.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            // Unique violation error code
            res.status(409).json({ message: "SSN already exists in the database" });
        } else {
            console.error('Error adding new customer:', error);
            res.status(500).send('Server error');
        }
    }
});

app.get('/api/customers', async (req, res) => {
    try {
        const allCustomers = await pool.query('SELECT * FROM customer'); // Replace 'customer' with your actual customer table name
        res.json(allCustomers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error while fetching customers');
    }
});

// Assuming `pool` is your database connection, and it's already set up.
// Add this endpoint to handle DELETE requests for deleting customers by SSN.

app.delete('/api/customers/:ssn', async (req, res) => {
    const { ssn } = req.params;
    try {
        // Check if there are any bookings associated with the customer
        const bookingsQuery = 'SELECT * FROM booking WHERE customer_id = $1';
        const bookings = await pool.query(bookingsQuery, [ssn]);

        if (bookings.rowCount > 0) {
            // If bookings exist, send a response indicating bookings need to be deleted first
            return res.status(400).json({ message: "Please delete all bookings associated with this customer first." });
        }

        // If no bookings, proceed to delete the customer
        const deleteCustomerQuery = 'DELETE FROM customer WHERE ssn = $1';
        const result = await pool.query(deleteCustomerQuery, [ssn]);

        if (result.rowCount === 0) {
            // If the customer wasn't found, send an appropriate response
            return res.status(404).json({ message: "Customer not found" });
        }

        // Customer deleted successfully
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while attempting to delete customer");
    }
});

app.put('/api/customers/:ssn', async (req, res) => {
    try {
        const { ssn } = req.params;
        const { name, address, email, date_of_registration } = req.body;

        const updateCustomerQuery = `
            UPDATE customer
            SET name = $1, address = $2, email = $3, date_of_registration = $4
            WHERE ssn = $5
            RETURNING *;
        `;
        const updatedCustomer = await pool.query(updateCustomerQuery, [name, address, email, date_of_registration, ssn]);

        if (updatedCustomer.rowCount === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.json(updatedCustomer.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while updating customer");
    }
});

app.post('/api/employee', async (req, res) => {
    try {
        const { employee_id, name, sin, hotel_id, role } = req.body;

        // Adjusted SQL query to match the 'employee' table
        const insertEmployeeQuery = `INSERT INTO employee (employee_id, name, sin, hotel_id, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const newEmployee = await pool.query(insertEmployeeQuery, [employee_id, name, sin, hotel_id, role]);

        res.status(201).json(newEmployee.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while adding employee");
    }
});

app.get('/api/employees', async (req, res) => {
    try {
        // Replace with your actual query to get employees from your database
        const result = await pool.query('SELECT * FROM employee'); // Adjust the query as per your DB schema
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error while fetching employees');
    }
});

app.delete('/api/employees/:employeeId', async (req, res) => {
    try {
        const { employeeId } = req.params;
        // Use a SQL query to delete the employee by their ID
        // Make sure to handle foreign key constraints if necessary
        const deleteQuery = 'DELETE FROM employee WHERE employee_id = $1 RETURNING *';
        const deletedEmployee = await pool.query(deleteQuery, [employeeId]);

        if(deletedEmployee.rowCount === 0) {
            // No employee found with the ID, or they could not be deleted
            return res.status(404).json({ message: 'Employee not found or cannot be deleted due to dependency' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        // Handle errors, e.g., foreign key violation
        if (err.code === '23503') { // Assuming PostgreSQL for FK violation code
            return res.status(400).json({ message: 'Cannot delete employee with dependent records' });
        }
        console.error(err.message);
        res.status(500).send('Server error while deleting employee');
    }
});

app.put('/api/employees/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { name, sin, hotel_id, role } = req.body;

    try {
        // SQL query to update the employee. 
        // Make sure to adjust the table name and fields to match your database schema.
        const updateEmployeeQuery = `
            UPDATE employee
            SET name = $1, sin = $2, hotel_id = $3, role = $4
            WHERE employee_id = $5
            RETURNING *;
        `;

        // Use a parameterized query to prevent SQL injection.
        const updatedEmployee = await pool.query(updateEmployeeQuery, [name, sin, hotel_id, role, employeeId]);

        if (updatedEmployee.rowCount === 0) {
            // No employee was updated, which means the employee wasn't found.
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Send the updated employee as a response.
        res.json(updatedEmployee.rows[0]);
    } catch (err) {
        // Log and send the error message.
        console.error(err.message);
        res.status(500).send('Server error while updating employee');
    }
});

// Example route in your Express application
app.post('/api/hotels', async (req, res) => {
    const { chain_id, rating, manager_id, num_rooms, address, phone_number } = req.body;

    try {
        // Check if chain_id exists in hotel_chain table
        const chainExists = await pool.query("SELECT EXISTS(SELECT 1 FROM hotel_chain WHERE chain_id = $1)", [chain_id]);
        if (!chainExists.rows[0].exists) {
            return res.status(400).json({ message: 'Invalid chain_id' });
        }

        // Check if manager_id exists in employees table
        const managerExists = await pool.query("SELECT EXISTS(SELECT 1 FROM employee WHERE employee_id = $1)", [manager_id]);
        if (!managerExists.rows[0].exists) {
            return res.status(400).json({ message: 'Invalid manager_id' });
        }

        // Insert hotel data into database
        const newHotel = await pool.query(`
            INSERT INTO hotel (chain_id, rating, manager_id, num_rooms, address, phone_number) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *;
        `, [chain_id, rating, manager_id, num_rooms, address, phone_number]);

        // Send success response with the newly added hotel data
        res.status(201).json({ message: 'Hotel added successfully', hotel: newHotel.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/api/hotels', async (req, res) => {
    try {
        // Replace with your actual query to get hotels from your database
        const result = await pool.query('SELECT * FROM hotel'); // Adjust the query as per your DB schema
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error while fetching hotels');
    }
});

app.delete('/api/hotels/:hotelId', async (req, res) => {
    const { hotelId } = req.params;
    try {
        // Check for any dependencies or related records before deleting
        // Example: Check if there are employees associated with the hotel
        const employeesQuery = 'SELECT * FROM employee WHERE hotel_id = $1';
        const employees = await pool.query(employeesQuery, [hotelId]);

        if (employees.rowCount > 0) {
            // If there are employees associated with the hotel, inform the user to handle them first
            return res.status(400).json({ message: "Please reassign or delete all employees associated with this hotel first." });
        }

        // Proceed to delete the hotel if no dependencies exist
        const deleteHotelQuery = 'DELETE FROM hotel WHERE hotel_id = $1';
        const result = await pool.query(deleteHotelQuery, [hotelId]);

        if (result.rowCount === 0) {
            // If the hotel wasn't found, send an appropriate response
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Hotel deleted successfully
        res.status(200).json({ message: "Hotel deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while attempting to delete hotel");
    }
});

app.put('/api/hotels/:hotel_id', async (req, res) => {
    const { hotel_id } = req.params;
    const { chain_id, rating, manager_id, num_rooms, address, phone_number, name } = req.body;

    try {
        // Update hotel information
        const updateHotelQuery = `
            UPDATE hotel 
            SET 
                chain_id = $1, 
                rating = $2, 
                manager_id = $3, 
                num_rooms = $4, 
                address = $5, 
                phone_number = $6,
                name = $7
            WHERE hotel_id = $8
        `;
        const result = await pool.query(updateHotelQuery, [chain_id, rating, manager_id, num_rooms, address, phone_number, name, hotel_id]);

        if (result.rowCount === 0) {
            // No hotel found to update
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Hotel updated successfully
        res.status(200).json({ message: "Hotel updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error while attempting to update hotel");
    }
});






















app.get("/all-chains", async (req, res) => {
    console.log("Received chain get request ");

    try {
        // Write SQL query to select all rows from the hotel_chain table
        const chainsQuery = 'SELECT * FROM hotel_chain';
        const hotelsQuery = 'SELECT * FROM hotel';

        // Execute the SQL queries using pool.query and await the results
        const chainsResponse = await pool.query(chainsQuery);
        const hotelsResponse = await pool.query(hotelsQuery);

        // If data is retrieved successfully, organize chains by chain ID
        const chainsById = {};
        chainsResponse.rows.forEach(chain => {
            const chainId = chain.chain_id;
            chainsById[chainId] = {
                chain_id: chainId,
                address: chain.address,
                email: chain.email,
                phone_number: chain.phone_number,
                hotels: [] // Initialize an empty array for hotels
            };
        });

        // If data is retrieved successfully, organize hotels by chain ID
        hotelsResponse.rows.forEach(hotel => {
            const chainId = hotel.chain_id;
            // Add hotel details to the corresponding chain's hotels array
            chainsById[chainId].hotels.push({
                hotel_id: hotel.hotel_id,
                name: hotel.name,
                address: hotel.address,
                phone_number: hotel.phone_number
            });
        });

        //console.log(JSON.stringify(chainsById, null, 2));

        //console.log(chainsById);

        // If data is retrieved successfully, send it as the response
        res.json({ chainsById });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error('Error fetching hotel chains:', error);
        res.status(500).json({ error: 'An error occurred while fetching hotel chains' });
    }
});



app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

