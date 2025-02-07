import { likeController } from "../controllers/likeme.controller.js";
import { Router } from "express";

const router = Router();

router.get("", likeController.getPosts);

router.post("", likeController.postPosts);

router.delete("/:id", likeController.deletePosts);

router.put("/like/:id", likeController.updatePosts);

export default router;
