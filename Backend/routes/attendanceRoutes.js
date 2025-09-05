import express from "express";
const router = express.Router();
import { checkIn, checkOut, 
    updateAttendance,deleteAttendance,getAllattendance,getAttendanceById} from "../controllers/attendanceController.js";
  import { protect,authorizeRoles } from "../middlewares/authmiddlewares.js";  
import { get } from "mongoose";

    


router.post("/checkin/:employeeId",protect,checkIn);
router.post("/checkout/:employeeId",protect, checkOut);
router.get("/getAttendance",protect, getAllattendance);
router.get("/:Id",protect, getAttendanceById);
router.put("/:id",protect,authorizeRoles("Admin","HR"),updateAttendance); // Update attendance by ID
router.delete("/:id",protect,authorizeRoles("Admin","HR"), deleteAttendance); // Delete attendance by ID

export default router;
