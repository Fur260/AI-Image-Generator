import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mongodb/models/post.js";

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").get(async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query || {};
    const limit = 10;
    const skip = (page - 1) * limit;
    const searchRegex = new RegExp(search, "i");

    const posts = await Post.find({
      $or: [{ name: searchRegex }, { prompt: searchRegex }],
    })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const count = await Post.countDocuments({
      $or: [{ name: searchRegex }, { prompt: searchRegex }],
    });

    res.status(200).json({ success: true, data: posts, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
