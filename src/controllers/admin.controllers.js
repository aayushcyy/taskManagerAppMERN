import express from "express";
import { User } from "../models/User.models.js";

const promoteUser = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ msg: "Email of the user is unavailable!" });

  try {
    const promotedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { [role]: "Admin" } },
      { new: true }
    );

    if (!promotedUser) throw new Error("User not found!");
    res.status(200).json({
      msg: "User promoted to Admin Successful!",
      userDetails: promotedUser,
    });
  } catch (error) {
    res.status(400).json({ msg: "Error updating the document" });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) res.status(500).json({ msg: "Can't get the users!" });
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).json({ msg: "Error getting all the users!" });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "email is not defined!" });

  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser)
      res.status(500).json({ error: "user not found with the given email" });

    res.status(200).json({
      msg: "User Deleted Successful!",
      deleteUser,
    });
  } catch (error) {
    res.status(400).json({ error: "Error deleting the user!" });
  }
};

export { promoteUser, getUsers, deleteUser };
