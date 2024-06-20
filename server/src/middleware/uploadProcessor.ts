import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const fileFilter = (req:Request, file: any, cb:any) => {
  if (file.mimetype === "video/mp4" || file.mimetype === "video/webm") {
    logger.info("file type supported", file);
    cb(null, true);
  } else {
    logger.info("file type not supported", file);
    cb(null, false);
  }
};

const s3Client = new S3Client({
    region: process.env.AWS_REGION ,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY || '',
      secretAccessKey: process.env.SECRET_KEY || '',
    },
  });
const s3Storage = multerS3({
  s3: s3Client, // s3 instance
  bucket: process.env.BUCKET_NAME || '', // change it as per your project requirement
  acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
  },
});
const upload = multer({
  // dest: 'uploads/videos',
  fileFilter: fileFilter,
  limits: { fileSize: 50000000 },
  storage: s3Storage,
}).single("video");

export const uploadProcessor = (req:Request, res:Response, next:NextFunction) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(400).json({ status: "error", error: err });
      return;
    } else {
      logger.info("upload success", req.file);
      // res.status(200).json({ status: "success", message: "upload success" });
      next();
    }
  });
};
