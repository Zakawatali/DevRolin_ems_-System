const Attendance = require("../models/Attendance");
// Employee Check-In
exports.checkIn = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const today = new Date();
    const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Check if already checked in
    let attendance = await Attendance.findOne({ employeeId, date: dateOnly });

    if (attendance && attendance.checkIn) {
      return res.status(400).json({ message: "Already checked in today." });
    }
      
    if (!attendance) {
      attendance = new Attendance({
        employeeId,
        date: dateOnly,
        checkIn: today,
      });
    } else {
      attendance.checkIn = today;
    }

    await attendance.save();
    res.status(200).json({ message: "Check-in successful", attendance });
  } catch (error) {
    res.status(500).json({ message: "Error during check-in", error: error.message });
  }
};

// ✅ Employee Check-Out
exports.checkOut = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const today = new Date();
    
    //const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
     
     const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    console.log("Attendance record found:", todayDate);
    let attendance = await Attendance.findOne({ employeeId,date:todayDate });
    

    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ message: "Cannot check out without check-in." });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out today." });
    }

    attendance.checkOut = today;
    await attendance.save();

    res.status(200).json({ message: "Check-out successful", attendance });
  } catch (error) {
    res.status(500).json({ message: "Error during check-out", error: error.message });
  }
};



// ✅ Update attendance
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      req.body, // fields to update (checkIn, checkOut, status, etc.)
      { new: true, runValidators: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete attendance
exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAttendance = await Attendance.findByIdAndDelete(id);

    if (!deletedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
      data: deletedAttendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
