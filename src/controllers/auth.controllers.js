import bcrypt from "bcryptjs";
import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../config/cloudinary.js";

const signupUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    let profilePicURL = null;
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        profilePicURL
          ? (profilePicURL = uploadResult.url)
          : (profilePicURL = "");
        console.log("Uploaded URL:", profilePicURL); // Check Cloudinary result
      } else {
        return res
          .status(500)
          .json({ message: "Failed to upload profile pic!" });
      }
    }

    user = new User({
      name,
      email,
      password: hashPass,
      role: role.toLowerCase(),
      profilePic: profilePicURL,
    });
    await user.save();

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ msg: "Error signing up", error: error.message });
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
