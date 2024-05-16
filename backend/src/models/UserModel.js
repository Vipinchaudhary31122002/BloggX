import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { COOKIE_EXPIRE, SECRET_TOKEN_KEY } from "../constants.js";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 4,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { collection: "Users" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, SECRET_TOKEN_KEY, {
    expiresIn: COOKIE_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };


// userSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   return resetToken;
// };
