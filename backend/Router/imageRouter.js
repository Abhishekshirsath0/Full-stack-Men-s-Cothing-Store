import express from "express";
import multer from "multer";
import * as uploadController from "../Controller/ImageController.js";

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const ImageRouter = express.Router();

ImageRouter.post("/upload", upload.single("image"), uploadController.postUploadImage);

export default ImageRouter;