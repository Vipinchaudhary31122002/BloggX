import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // img_url: {
    //   type: String,
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { collection: "Posts", timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
