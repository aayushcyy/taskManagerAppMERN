import express from "express";
import {
  addTask,
  deleteATask,
  updateTask,
  viewTasks,
} from "../controllers/task.controllers.js";

const router = express.Router();

// Route for adding a task (protected by middleware)
router.post("/add", addTask);

// Route for viewing tasks
router.get("/view", viewTasks);

// Route for updating a task
router.put("/update/:id", updateTask);

// Route for deleting a task
router.delete("/update/:id", deleteATask);

export default router;
