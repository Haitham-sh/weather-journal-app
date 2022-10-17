// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = process.env.PORT || 8000;
// Spin up the server
const server = app.listen(port, ()=>{console.log(`running on localhost:${port}`)});
// GET route
app.get('/store',(req,res)=>{
res.send(projectData)
console.log(projectData)
});
// Post Route
app.post('/postinfo',(req,res)=>{ 
projectData.temp= req.body.temp,
projectData.city= req.body.city,
projectData.newDate= req.body.newDate,
projectData.feeling= req.body.feeling,
res.send()
});