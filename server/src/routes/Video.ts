import express from "express";
import VideoController from "../controllers/VideoController";
import { uploadProcessor } from "../middleware/uploadProcessor";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', VideoController.getVideos);
router.post('/upload', uploadProcessor, VideoController.upload);

export default router;