// Load required modules
const express = require("express");
const path = require("path");
const taskRoutes = require("./app/routes/taskRoutes");

// Create express application
const app = express();

// Listen on port 8080 for connections
app.listen(8080, () => {
  console.log(`Server started and listening at http://localhost:8080`);
});

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Handle HTTP POST requests
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use(taskRoutes);
