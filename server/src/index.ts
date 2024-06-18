import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import app from "./app";
import logger from "./logger";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database !"));

const PORT = 8000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket: Socket) => {
  logger.info("a user connected", socket.id);

  socket.on("disconnect", () => {
    logger.info("user disconnected", socket.id);
  });

  socket.on("message", (message: string) => {
    logger.info("message received:", message);
    io.emit("message", message);
  });
});

httpServer.listen(PORT, async () => {
  logger.info(`listening on port ${PORT}`);
  // which request, what handler
  app.use("/", (req, res) => {
    logger.info(`request received at ${new Date()}`);
    logger.info("req", req.body);
    //console.dir(res);
    res.send(`request received at ${new Date()}`);
  });

  logger.info("application started", new Date().toTimeString());
});
