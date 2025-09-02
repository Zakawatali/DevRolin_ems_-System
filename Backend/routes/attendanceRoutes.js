const express = require("express");
const router = express.Router();
const { checkIn, checkOut, 
    updateAttendance,deleteAttendance, } = require("../controllers/attendanceController");

router.post("/checkin/:employeeId", checkIn);
router.post("/checkout/:employeeId", checkOut);
router.put("/:id", updateAttendance); // Update attendance by ID
router.delete("/:id", deleteAttendance); // Delete attendance by ID

module.exports = router;
