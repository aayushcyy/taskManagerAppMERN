import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "Email already exists. Please Login" });

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // Create a new User
    user = new User({
      name: name,
      email: email,
      password: password,
      role: "user",
    });
    await user.save();

    // Generating Token for the Auto login process
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "user created successful", token: token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User doesn't exists! Please signup." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!" });

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ msg: `Welcome back ${user.name}!` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { signupUser, loginUser };
