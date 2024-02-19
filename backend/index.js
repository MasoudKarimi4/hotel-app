// Const is a variable that cannot be changed 


// Importing the required libraries / packages
// Express is the backend framework
// Cors is needed 
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

