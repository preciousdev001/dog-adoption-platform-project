const express = require("express");
const app = express();

const connectDB = require("./db");

// database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// middleware

// routes
