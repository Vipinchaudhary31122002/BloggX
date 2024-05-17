import { Router } from "express";
import {
  CreatePost,
  AllPost,
  // DeletePost,
  // UpdatePost,
  UserPost,
} from "../controllers/PostController.js";
import { userVerification } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.route("/createpost").post(userVerification, CreatePost);
router.get("/allpost", AllPost);
router.route("userpost").get(userVerification, UserPost);
// router.get("/deletepost", DeletePost);
// router.put("/updatepost", UpdatePost);

export default router;
