import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./Router/userRouter.js";
import ItemsRouter from "./Router/itemsRouter.js";
import ImageRouter from "./Router/imageRouter.js";  
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});


if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const pathDB = process.env.mongoURI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/items", ItemsRouter);
app.use("/images", ImageRouter); 

mongoose.connect(pathDB).then(() => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });
});