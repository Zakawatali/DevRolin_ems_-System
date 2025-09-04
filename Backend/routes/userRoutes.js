import express from "express";
import { registerUser, loginUser, getAllUsers,approveUser,rejectUser } from "../controllers/userController.js";
import { protect,authorizeRoles } from "../middlewares/authmiddlewares.js";

const router = express.Router();

// Routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/",protect, getAllUsers);
 router.post("/approve/:userId",protect, authorizeRoles("Admin","HR"), approveUser)
 router.post("/reject/:userId",protect, authorizeRoles("Admin","HR"), rejectUser);


export default router;
