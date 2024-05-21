import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY;
export const COOKIE_EXPIRE = process.env.COOKIE_EXPIRE;
