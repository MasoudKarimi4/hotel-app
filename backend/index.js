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
    console.log('Server is listening on port 500e0e')
})

