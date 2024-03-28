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

app.post("/createcustomer", async (req, res) => {
    console.log("Received request at /createcustomer"); // Debug log
    try {
        const { name, email, address } = req.body; // Extracting customer details from request body

        console.log('SQL Query:', `
         INSERT INTO customer (name, email, address, date_of_registration) 
         VALUES($1, $2, $3, CURRENT_DATE) 
         ON CONFLICT (email) DO NOTHING 
         RETURNING *
     `);


        // Ensure that name, email, and address are provided in the request body
        if (!name || !email || !address) {
            return res.status(400).json({ message: "Name, email, and address are required" });
        }

        // Insert new customer into the database, including the current date for date_of_registration
        // Use ON CONFLICT to ignore the insert if the email already exists
        const newCustomer = await pool.query(`
            INSERT INTO customer (name, email, address, date_of_registration) 
            VALUES($1, $2, $3, CURRENT_DATE) 
            ON CONFLICT (email) DO NOTHING 
            RETURNING *
        `, [name, email, address]);

        // Check if a new customer was inserted
        if (newCustomer.rows.length > 0) {
            // Send the newly created customer as a response
            res.status(201).json(newCustomer.rows[0]);
        } else {
            // If no new customer was inserted, it means the email already exists
            res.status(409).json({ message: "Email already exists in the database" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});


app.get("/all-chains", async (req, res) => {
    console.log("Received chain get request ");

    try {
        // Write SQL query to select all rows from the hotel_chains table
        const query = 'SELECT * FROM hotel_chain';

        // Execute the SQL query using pool.query and await the result
        const { rows } = await pool.query(query);
        // If data is retrieved successfully, organize it by chain ID
        const chainsById = {};
        
        rows.forEach(chain => {
            const chainId = chain.chain_id;
            
            // Add the chain to the corresponding ID in the object
            chainsById[chainId] = {
                address: chain.address,
                email: chain.email,
                phone_number: chain.phone_number
            };
        });
        
        console.log(chainsById);
        
        // If data is retrieved successfully, send it as the response
        res.json({ chainsById });
    } catch (error) {
        // If an error occurs, log it and send an error response
        console.error('Error fetching hotel chains:', error);
        res.status(500).json({ error: 'An error occurred while fetching hotel chains' });
    }
});




















// USELESS ROUTES /////////////////////////////////////////////////////////
// Create a Todo


app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body; // Corrected typo

        // Ensure that description is provided in the request body
        /*if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }*/

        // Insert new todo into the database
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", 
        [description]);

        // Send the newly created todo as a response
        res.status(201).json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});


// get all todos

app.get("/todos", async (req, res) => { 
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

// get a todo
app.get("/todos/:id", async (req, res) => { 
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * from todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id])

        res.json("Todo was updated!")
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }

});


// delete a todo 
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo was deleted!");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

