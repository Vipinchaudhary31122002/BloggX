import { Post } from "../models/PostModel.js";
import { Comment } from "../models/CommentModel.js";
import { Like } from "../models/LikeModel.js";

export const CreatePost = async (req, res) => {
  try {
    // console.log(req.body);
    const post = {
      title: req.body.title,
      content: req.body.content,
      userId: req.userdata,
      username: req.userdata.username,
      // img_url: req.body.img_url.name,
    };
    console.log(post.img_url);
    await Post.create(post);
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

export const DeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(201).json({ message: "post deleted", success: true });
  } catch (error) {
    console.error(error);
  }
};

export const UpdatedPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedpost = await Post.find({ _id: id });
    res.status(201).json(...updatedpost);
  } catch (error) {
    console.error(error);
  }
};

export const UpdatePost = async (req, res) => {
  try {
    const postid = req.params.id;
    const { title, content } = req.body;
    const updatepost = await Post.findByIdAndUpdate(postid, {
      title,
      content,
    });
    if (updatepost) {
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "error occured on server while updating post" });
  }
};

export const UserPost = async (req, res) => {
  try {
    const { id } = req.userdata;
    const userpost = await Post.find({ userId: id });
    res.status(201).json([...userpost]);
  } catch (error) {
    console.error(error);
  }
};

export const AllComments = async (req, res) => {
  try {
    const { id } = req.params;
    const postcomment = await Comment.find({ postId: id });
    res.status(201).json([...postcomment]);
  } catch (error) {
    console.error(error);
  }
};

export const CreateComment = async (req, res) => {
  try {
    const comment = {
      postId: req.body.id,
      userId: req.userdata.id,
      username: req.userdata.username,
      comment: req.body.comment,
    };
    await Comment.create(comment);
    res
      .status(201)
      .json({ message: "comment created successfully", success: true });
  } catch (error) {
    if (error.code === 11000) {
      res.json({
        message:
          "Duplicate comment error: User has already commented on this post.",
      });
    }
    console.error(error);
  }
};

export const LikePost = async (req, res) => {
  try {
    const like = {
      postId: req.params.id,
      userId: req.userdata.id,
      like: true,
    };
    await Like.create(like);
    res.status(201).json({ message: "post liked", success: true });
  } catch (error) {
    if (error.code === 11000) {
      res.json({
        message:
          "Duplicate comment error: User has already commented on this post.",
      });
    }
    console.error(error);
  }
};

export const UnLikePost = async (req, res) => {
  try {
    const postid = req.params.id;
    const userid = req.userdata.id;
    const like = await Like.findOneAndDelete({ postid, userid });
    if (!like) {
      return res
        .status(404)
        .json({ message: "Like not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Like removed successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

export const UserLiked = async (req, res) => {
  try {
    const postid = req.params.id;
    const userid = req.userdata.id;
    const userlikedpost = await Like.findOne({ postid: postid, userid: userid });
    console.log(userlikedpost);
    res.status(201).json({ ...userlikedpost });
  } catch (error) {
    console.error(error);
  }
};
