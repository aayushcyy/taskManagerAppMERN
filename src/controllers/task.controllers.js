import { Task } from "../models/addTask.models.js";

let tasks = [];

const addTask = async (req, res) => {
  try {
    const newTask = new Task({
      id: req.body.id,
      title: req.body.title,
      owner: req.user.name,
      complete: false,
    });
    await newTask.save();

    res.status(201).send("Task added successful!");
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding task", error: error.message });
  }
};

const viewTasks = async (req, res) => {
  try {
    // sorting option
    const sortField = req.query.sort || "id";
    const sortOrder = req.query.order === "desc" ? -1 : 1;

    // pagination option
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    // Searching with exact word
    const searchWord = req.query.search;

    let searchRule = {};
    if (searchWord) {
      searchRule = { title: { $regex: searchWord, $options: "i" } };
    }

    // Filtering
    const completeRule = req.query.completed;
    const ownerRule = req.user.name;
    let filterRule = {};

    if (completeRule === "true") filterRule.completed = true;
    if (completeRule === "false") filterRule.completed = false;

    if (req.user.role !== "admin" || req.user.role !== "Admin") {
      filterRule.owner = ownerRule;
    }

    //Merging Searching and Filtering rule
    const allRule = { ...filterRule, ...searchRule };

    // counting total task
    const totalTask = await Task.countDocuments(allRule);
    const tasks = await Task.find(allRule)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(201).send(tasks);
  } catch (error) {
    res.status(500).send("Oops! couldn't found the task", error);
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      res.status(404).send("Task updating unsuccessful!");
    }

    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(400).json({ error: "Oops! Couldn’t update: " + error });
  }
};

const deleteATask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      res.status(404).json({ message: "Error deleting the task" });
    }

    res.status(201).json({ message: "Task deleted Successful!" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete task: " + error.message });
  }
};

const welcome = (req, res) => {
  res.send("Welcome to the app");
};

export { addTask, viewTasks, welcome, updateTask, deleteATask };
