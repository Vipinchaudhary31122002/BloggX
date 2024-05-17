import { COOKIE_EXPIRE } from "../constants.js";
export const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getJWTToken();
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    };
    res.status(statusCode).cookie("token", token, cookieOptions).json({
      success: true,
      id: user._id.toString(),
      message: "token successfully delivered to client",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error while sending token",
    });
  }
};
