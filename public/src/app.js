const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Mount caste routes
const casteRoutes = require("./routes/casteRoutes");
app.use("/caste", casteRoutes);

// Mount country routes
const countryRoutes = require("./routes/countryRoutes");
app.use("/country", countryRoutes);

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "dashboard.html"));
});

module.exports = app;
