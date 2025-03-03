import express from "express";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { welcome } from "./src/controllers/task.controllers.js";
import { logRequest } from "./src/middlewares/logRequest.middlewares.js";
import myRouter from "./src/routes/taskRoutes.js";
import "dotenv/config";
import connectDB from "./src/config/db.js";

const app = express();
app.use(express.json());

app.use(errorMiddleware);

//logs every request Middleware
app.use(logRequest);

app.use("/tasks", myRouter);
app.get("/", welcome);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}!`);
});
