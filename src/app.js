require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");


// Middleware to parse JSON request bodies
app.use(express.json());


// Use the routes
app.use("/api", routes);


// Handle 404 errors
app.use(notFound);


// Error handling middleware
app.use(errorHandler);


module.exports = app;