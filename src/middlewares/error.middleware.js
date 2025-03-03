import express from "express";

export const errorMiddleware = (err, req, res, next) => {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ error: err });
  });
};
