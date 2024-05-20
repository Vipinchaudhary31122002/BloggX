import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      maxlength: 500,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
  },
  { collection: "Comments", timestamps: true }
);

commentSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const Comment = mongoose.model("Comment", commentSchema);
