import express from "express";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { welcome } from "./src/controllers/task.controllers.js";
import { logRequest } from "./src/middlewares/logRequest.middlewares.js";
import myRouter from "./src/routes/taskRoutes.js";
import adminRouter from "./src/routes/AdminRoutes.js";
import authRouter from "./src/routes/AuthRoutes.js";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import AdmintMiddleware from "./src/middlewares/Admin.middleware.js";
// import AuthMiddleware from "./src/middlewares/Auth.middleware.js";

const app = express();
app.use(express.json());

app.use(errorMiddleware);

//logs every request Middleware
app.use(logRequest);
// app.use(AuthMiddleware);

//task router
app.use("/tasks", myRouter);

//auth router
app.use("/auth", authRouter);

// route for admin
app.use("/admin", AdmintMiddleware, adminRouter);

app.get("/", welcome);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}!`);
});
