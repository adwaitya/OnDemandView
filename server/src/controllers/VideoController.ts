import { Request, Response } from "express";
import logger from "../logger";
import Video from "../models/Video";
import { VIDEO_QUEUE_EVENTS } from "../constant";
import { addQueueItem } from "../queues/queue";


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

const upload = async (req: Request, res: Response) => {
  try {
    // console.log("req?.file", req?.file);
    const file = req.file as  Express.MulterS3.File;
    const dbPayload = {
      ...req.body,
      originalName: req?.file?.originalname,
      createdDate: new Date(),
      s3Url: file?.location,
      viewCount: 0,
      duration: 0,
      // status: VIDEO_STATUS.PUBLISHED
    };
    logger.info("dbPayload", { dbPayload });
    const video = new Video(dbPayload);
    const result = await video.save();
     await addQueueItem(VIDEO_QUEUE_EVENTS.VIDEO_UPLOADED, dbPayload);
    
    res.status(200).json({
      status: "success",
      message: "Upload success",
    });
    return;
  } catch (error) {
    logger.error(error);
    res.send(error);
  }
};

export default {
  getVideos,
  upload,
};
