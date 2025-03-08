import { User } from "../models/User.models.js";

const promoteUser = async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ msg: "Please provide the email" });

  try {
    const promotedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { role: "Admin" } },
      { new: true }
    );

    if (!promotedUser) return res.status(404).json({ msg: "User not found!" });

    res.status(200).json({
      msg: "User promoted to Admin Successful!",
      userDetails: promotedUser,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    // sorting users
    const sortField = req.query.sort || "name";
    const sortOrder = req.query.order === "desc" ? -1 : 1;

    // pagination option
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Searching
    const searchUser = req.query.search;

    let searchRule = {};
    if (searchUser) {
      searchRule = { name: new RegExp(searchUser, "i") };
    }

    // Filtering
    const usersRule = req.query.filterBy;
    let filterRule = {};
    if (usersRule === "user" || usersRule === "admin") {
      filterRule.role = usersRule;
    }

    // Merging rules
    const allRule = { ...filterRule, ...searchRule };

    // couting all the users
    const totalUsers = await User.countDocuments(allRule);

    const allUsers = await User.find(allRule)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    if (allUsers.length === 0) {
      return res.status(404).json({ msg: "No users found!" });
    }

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
      res.status(404).json({ error: "user not found with the given email" });

    res.status(200).json({
      msg: "User Deleted Successful!",
      deleteUser,
    });
  } catch (error) {
    res.status(400).json({ error: "Error deleting the user!" });
  }
};

export { promoteUser, getUsers, deleteUser };
