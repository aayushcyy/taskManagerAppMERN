import bcrypt from "bcryptjs";
import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../config/cloudinary.js";

const signupUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: `Credentials are undefined! name: ${name}, email: ${email}, password: ${password}`,
      });
    }
    // Check if user exists
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "Email already exists. Please Login" });

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    let profilePicURL = null;
    if (req.file) {
      const uploadResult = uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        profilePicURL = uploadResult.url;
      } else {
        return res
          .status(500)
          .json({ message: "Failed to upload profile pic!" });
      }
    }

    // Create a new User
    user = new User({
      name: name,
      email: email,
      password: hashPass,
      role: role.toLowerCase(),
      profilePic: profilePicURL,
    });
    await user.save();

    // Generating Token for the Auto login process
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "user created successful", token: token });
  } catch (error) {
    res.status(500).json({ msg: "error signing up", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
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

    res.status(200).json({ msg: `Welcome back ${user.name}!`, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export { signupUser, loginUser };
