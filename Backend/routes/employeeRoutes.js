import express from "express";
import { getAllEmployees,getEmployeeById } from "../controllers/employeeController.js";


const router = express.Router();

// Routes
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);



export default router;
