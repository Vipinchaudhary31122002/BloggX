import { COOKIE_EXPIRE } from "../constants.js";

export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    message: "User signed up successfully",
  });
};