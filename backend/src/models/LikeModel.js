import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    like: {
      type: Boolean,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { collection: "likes", timestamps: true }
);

likeSchema.index({ userId: 1, postId: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);
