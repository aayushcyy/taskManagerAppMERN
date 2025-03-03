import mongoose, { Schema } from "mongoose";

const task = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    completed: {
      default: false,
      type: Boolean,
    },
    owner: {
      type: String,
      default: "Aayush",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", task);
