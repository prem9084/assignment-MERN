import express from "express";
import formidable from "express-formidable";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getPostPhoto,
  singlePostController,
  updatePostController,
} from "../controllers/PostController.js";
import { isAuth } from "../middlesware/authMiddelware.js";

const router = express.Router();

router.post("/create-post", isAuth, formidable(), createPostController);
router.put("/update-post/:uid", isAuth, formidable(), updatePostController);
router.delete("/delete-post/:id", isAuth, deletePostController);
router.get("/get-post", getAllPostController);

// single post

router.get("/single-post/:slug", singlePostController);

// for get post

router.get("/get-post-photo/:uid", getPostPhoto);

export default router;
