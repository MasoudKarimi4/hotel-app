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

// get a todo

//update a todo

// delete a todo 

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

