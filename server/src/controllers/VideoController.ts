import { Request, Response } from "express";
import logger from "../logger";

const getVideos = async (req: Request, res: Response) => {
  try {
    logger.info(`GET`, req.params);
    // write a service to get all the videos already uploaded
    res.json({
      status: "success",
      message: "OK",
      timestamp: new Date(),
    });
  } catch (error) {
    logger.error("Failed to getgetVideos", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
    getVideos
}
