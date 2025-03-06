import express from "express";
import {
  addTask,
  deleteATask,
  updateTask,
  viewTasks,
} from "../controllers/task.controllers.js";
import AuthMiddleware from "../middlewares/Auth.middleware.js";

const router = express.Router();

// Route for adding a task (protected by middleware)
router.post("/add", AuthMiddleware, addTask);

// Route for viewing tasks
router.get("/view", AuthMiddleware, viewTasks);

// Route for updating a task
router.put("/update/:id", AuthMiddleware, updateTask);

// Route for deleting a task
router.delete("/update/:id", AuthMiddleware, deleteATask);

export default router;
