const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

// global middleware
app.use(cors());
app.use(express.json());

// database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// middleware

// routes
