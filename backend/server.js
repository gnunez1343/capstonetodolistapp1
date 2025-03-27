// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const { connectDB } = require("./config/config");
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
// Routes
app.use("/api/tasks", taskRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
