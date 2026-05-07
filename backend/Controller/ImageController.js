import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath ) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {  
      resource_type: "image",
    });
    fs.unlinkSync(localFilePath);  // delete local file after upload
    return result;                 // this contains the URL and other info about the uploaded image
  } catch (error) {
    fs.unlinkSync(localFilePath);  // delete even on failure
    throw error;
  }
};

export const postUploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const uploaded = await uploadOnCloudinary(req.file.path);

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: uploaded.url,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
};