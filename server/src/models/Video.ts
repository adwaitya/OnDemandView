import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    s3Url: String,
    status: {
      type: String,
      default: 'uploaded'
    },
    transcodedPath: String,
    thumbnailPath: String,
    m3u8Dir: String,
    duration:Number,
    originalName:String,
    createdDate:{ type: Date, required: true },
    // publicationDate:{ type: Date, required: true },
})

const Video = mongoose.model("Video", videoSchema);
export default Video;