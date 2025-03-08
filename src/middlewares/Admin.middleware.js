import jwt from "jsonwebtoken";

const AdmintMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "Action denied! Please login first" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (!req.user.role === "admin" || !req.user.role === "Admin") {
      res
        .status(401)
        .json({ msg: "Action denied! This action is only allowed to users." });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export default AdmintMiddleware;
