import { Post } from "../models/PostModel.js";

export const CreatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await Post.create({ title, content });
    res
      .status(201)
      .json({ message: "post created successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

export const AllPost = async (req, res, next) => {
  try {
    const post = await Post.find();
    res.json([...post]);
  } catch (error) {
    console.error(error);
  }
};

export const DeletePost = async (req, res, next) => {
  // try {
  //   const post = await Post.find();
  //   res.json([...post]);
  // } catch (error) {
  //   console.error(error);
  // }
};

export const UpdatePost = async (req, res, next) => {
  try {
    const { postid, title, content } = req.body;
    const data = { title, content };
    const updatedPost = await Post.updateOne({ _id: postid }, { $set: data });
    if (updatedPost.nModified === 1) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

export const UserPost = async (req, res, next) => {
  // try {
  //   const { userid } = req.body;
  //   const userpost = await Post.find(userid);
  //   res.status(201).json([...userpost]);
  // } catch (error) {
  //   console.error(error);
  // }
};