import express from "express";
import {
   createPost,
   getPost,
   updatePost,
   deletePost,
   likePost,
   getTimelinePosts,
} from "../Controllers/post_controller.js";

import authMiddleWare from "../middleware/auth_middleware.js";

const router = express.Router();

//? Test
// router.get('/', async(req, res) => {
//    res.send(" Post Router TEST")
// })

router.get("/:id", getPost);
router.get("/:id/timeline", getTimelinePosts);
router.post("/", authMiddleWare, createPost);
router.put("/:id", authMiddleWare, updatePost);
router.delete("/:id", authMiddleWare, deletePost);
router.put("/:id/like", authMiddleWare, likePost);
export default router;
