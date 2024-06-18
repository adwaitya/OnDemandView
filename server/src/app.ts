import cors from "cors";
import express, { Request, Response } from "express";
import videoRoute from './routes/Video';

const app = express();

app.use(express.json());
app.use(cors());
app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" });
  });
app.get("/test", async (req:Request, res:Response) => {
    res.json({message:'hello'})
})
app.use("/api/videos", videoRoute);

export default app;