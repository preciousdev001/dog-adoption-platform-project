const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const dogRoutes = require("./routes/dog.routes");

const app = express();

// global middleware
app.use(cors());
app.use(express.json());

// mount routes
app.use("/api/dogs", dogRoutes);

// database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// middleware

// routes

app.get("/", (req, res) => {
  res.send("Dog Adoption Platform API is running ...");
});

module.exports = app;
