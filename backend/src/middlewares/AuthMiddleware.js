import { User } from "../models/UserModel.js";
import { SECRET_TOKEN_KEY } from "../constants.js";
import jwt from "jsonwebtoken";

export const userVerification = async (req, res) => {
  const token = req.cookies.token;
  console.log(req.cookies);
  if (!token) {
    return res.json({ status: false });
  }
  await jwt.verify(token, SECRET_TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};