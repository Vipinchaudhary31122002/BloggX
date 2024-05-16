import { Router } from "express";
import {
  CreatePost,
  AllPost,
  DeletePost,
  UpdatePost,
  UserPost,
} from "../controllers/PostController.js";

const router = Router();

router.post("/createpost", CreatePost);
router.get("/allpost", AllPost);
router.get("/deletepost", DeletePost);
router.put("/updatepost", UpdatePost);
router.get("/userpost", UserPost);

export default router;
