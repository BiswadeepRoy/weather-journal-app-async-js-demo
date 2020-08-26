// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const listen = app.listen(port, () => {
    console.log("Server listening at localhost:" + port);
});

//Post call
app.post('/postdata', postProjectData);

// Callback function to complete POST '/postdata'
function postProjectData(req, res) {

    projectData = req.body;
    console.log(projectData);
}

//Get call
app.get('/getdata', getProjectData);

// Callback function to complete GET '/getdata'
function getProjectData(req, res) {
    res.send(JSON.stringify(projectData));
}