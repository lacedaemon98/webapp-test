// Import express
let express = require('express');

const serverless = require('serverless-http');

// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://lacedaemon98:bop@1998@cluster0.kqkhx.mongodb.net/pokedex?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 5000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World'));


// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
var server = app.listen(port, function () {
    console.log("Running Pokedex on port " + port);
});

module.exports = server;
module.exports.handler = serverless(app);
