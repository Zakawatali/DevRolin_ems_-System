import express from "express";
import {
  applyLeave,
  getAllLeaves,
  getLeaveById,
  approveLeave,
  rejectLeave,
  cancelLeave,
} from "../controllers/leaveController.js";
import { protect,authorizeRoles } from "../middlewares/authmiddlewares.js";

const router = express.Router();


router.post("/applyLeave",protect, applyLeave); // Employee applies leave
router.get("/",protect, getAllLeaves);          // Get all leaves
router.get("/:id",protect, getLeaveById);        // Get leave by id
router.put("/approve/:id",protect,authorizeRoles("Admin","HR"), approveLeave);// Approve leave
router.put("/reject/:id",protect,authorizeRoles("Admin","HR"), rejectLeave); // Reject leave
router.put("/cancel/:id",protect,authorizeRoles("Admin","HR"), cancelLeave);  // Cancel leave

export default router;
