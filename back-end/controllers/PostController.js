import PostModel from "../model/PostModel.js";
import fs from "fs";
import slugify from "slugify";
export const createPostController = async (req, res) => {
  try {
    const { pname, title, description, slug } = req.fields;
    const { photo } = req.files;
    if (!pname) {
      res.send({ message: "Post Name is required" });
    }
    if (!title) {
      res.send({ message: "title is required" });
    }
    if (!description) {
      res.send({ message: "Description is required" });
    }
    if (photo && photo.size > 10000000) {
      res
        .status(500)
        .send({ message: "Photo's size con not be greter then 1mg" });
    }

    const post = await new PostModel({
      ...req.fields,
      slug: slugify(pname),
    });

    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.cantentType = photo.type;
    }
    await post.save();
    res.status(200).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    res.status(400).send({ message: "Error createing post" });
  }
};

// for update post

export const updatePostController = async (req, res) => {
  try {
    const { pname, title, description } = req.fields;
    const { photo } = req.files;

    if (photo && photo.size > 1000000) {
      res
        .status(500)
        .send({ message: "Photo's size must be lesthen than 1mb" });
    }

    const post = await PostModel.findByIdAndUpdate(
      req.params.uid,
      { ...req.fields, slug: slugify(pname) },
      { new: true }
    );

    if (photo) {
      post.photo.data = fs.readFileSync(photo.path);
      post.photo.cantentType = photo.type;
    }
    await post.save();
    res.status(200).send({
      success: true,
      message: "Post Update Successfully",
      post,
    });
  } catch (error) {
    res.status(400).send({ message: "Error createing post" });
  }
};

// for delete post

export const deletePostController = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const post = await PostModel.find({});

    res.status(201).send({
      totalCount: post.length,
      success: true,
      message: "All Post get successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

// photo controller

export const getPostPhoto = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.uid).select("photo");
    if (post.photo.data) {
      res.set("Cantent-Type", post.photo.cantentType);
      return res.status(200).send(post.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Somthng went wrong",
      error,
    });
  }
};

// get single post

export const singlePostController = async (req, res) => {
  try {
    const post = await PostModel.findOne({
      slug: req.params.slug,
    }).select("-photo");

    res.status(200).send({
      success: true,
      message: "Get Single Products Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};
