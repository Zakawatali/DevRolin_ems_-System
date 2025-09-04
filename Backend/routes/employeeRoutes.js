import express from "express";
import { getAllEmployees,getEmployeeById } from "../controllers/employeeController.js";
import { protect,authorizeRoles } from "../middlewares/authmiddlewares.js";


const router = express.Router();

// Routes
router.get("/", protect, authorizeRoles("Employee","HR", "Admin"),getAllEmployees);
router.get("/:id",protect, authorizeRoles("Employee","HR", "Admin"), getEmployeeById);



export default router;
