import express from "express";
import {
   getAllUsers,
   getUser,
   updateUser,
   deleteUser,
   followUser,
   unfollowUser,
} from "../controllers/user_controller.js";

import authMiddleWare from "../middleware/auth_middleware.js";

const router = express.Router();

//? Test
// router.get('/', async (req, res) => {
//    res.send("User Router TEST")
// })

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unfollowUser);

export default router;
