require("dotenv").config();
const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");

const routes = require("./routes");

// Middleware to parse JSON request bodies
app.use(express.json());


// Use the routes
app.use("/api", routes);



// Error handling middleware
app.use(errorHandler);


module.exports = app;