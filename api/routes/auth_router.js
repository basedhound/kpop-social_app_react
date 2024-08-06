import express from "express";
import { loginUser, registerUser } from "../controllers/auth_controller.js";
const router = express.Router();

// router.get('/', async (req, rs) => {
//    resizeBy.send("Auth Router TEST")
// })

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
