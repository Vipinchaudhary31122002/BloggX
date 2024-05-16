import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Your post title is required"],
    },
    content: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { collection: "Posts" }
);

export const Post = mongoose.model("Post", postSchema);
