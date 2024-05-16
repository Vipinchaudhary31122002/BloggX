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
    },
    // img_url: {
    //   type: String,
    // },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { collection: "Posts" }
);

export const Post = mongoose.model("Post", postSchema);
