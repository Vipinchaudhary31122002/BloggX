import { COOKIE_EXPIRE } from "../constants.js";

export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("token", token, options).json({
    success: true,
    //   email: user.email,
    //   username: user.username,
    message: "User signed up successfully",
  });
  // res.status(statusCode).cookie("token", token, options).json({
  //   success: true,
  //   email: user.email,
  //   username: user.username,
  //   token,
  //   message: "User signed up successfully",
  // });
};
