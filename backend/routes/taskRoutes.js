const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Get all tasks
router.get("/", taskController.getAllTasks);

// Get a specific task
router.get("/:id", taskController.getTaskById);

// Create a new task
router.post("/", taskController.createTask);

// Update a task
router.put("/:id", taskController.updateTask);

// Delete a task
router.delete("/:id", taskController.deleteTask);

// Get task statistics
router.get("/stats/completion", taskController.getTaskStats);

module.exports = router;
