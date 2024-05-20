import { Router } from "express";
import {
  UpdatedPost,
  CreatePost,
  AllPost,
  DeletePost,
  UpdatePost,
  UserPost,
  CreateComment,
  AllComments,
} from "../controllers/PostController.js";
import { userVerification } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.route("/createpost").post(userVerification, CreatePost);

router.get("/allpost", AllPost);
router.route("/userpost").get(userVerification, UserPost);

router.route("/deletepost/:id").delete(userVerification, DeletePost);

router.route("/updatepost/:id").put(userVerification, UpdatePost);
router.route("/updatedpost/:id").get(userVerification, UpdatedPost);

router.route("/createcomment").post(userVerification, CreateComment);
router.route("/comments/:id").get(userVerification, AllComments);

export default router;
