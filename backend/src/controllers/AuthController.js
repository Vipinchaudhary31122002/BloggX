import { sendToken } from "../utils/SecretToken.js";
import { User } from "../models/UserModel.js";
// import bcrypt from "bcrypt";

export const Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username });
    res
      .status(201)
      .json({ message: "account created successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password" });
    }
    sendToken(user, 200, res);
    next();
  } catch (error) {
    console.error(error);
  }
};

export const ForgotPassword = async (req, res, next) => {
  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    user.password = await bcrypt.hash(newpassword, 12);
    await user.save();
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "password changed successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};