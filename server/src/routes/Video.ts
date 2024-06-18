import express from "express";
import VideoController from "../controllers/VideoController";

const router = express.Router();

router.get('/', VideoController.getVideos);

export default router;