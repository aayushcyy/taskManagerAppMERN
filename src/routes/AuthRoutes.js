import express from "express";
import { loginUser, signupUser } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

export default router;
