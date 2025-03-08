import express from "express";
import {
  promoteUser,
  getUsers,
  deleteUser,
} from "../controllers/admin.controllers.js";

const router = express.Router();

// Promot User to Admin
router.put("/promote", promoteUser);

// Get All the users
router.get("/get-user", getUsers);

// Delete a user
router.delete("delete-user", deleteUser);

export default router;
