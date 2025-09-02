import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import EmployeeProfile from '../models/EmployeeProfile.js';

// User Signup
export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      dateOfBirth,
      department,
      position,
      experience,
      education,
      role,
      status,
    } = req.body;
    if (!firstName || !lastName || !email || !password || !department || !phone
      || !role || !address || !dateOfBirth || !department || !position || !experience || !education
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });  
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      address,
      dateOfBirth,
      department,
      position,
      experience,
      education,
      role,
      status,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
//     // Jwt Token Generator
//     const token = jwt.sign(
//   { id: user._id, email: user.email }, 
//   process.env.JWT_SECRET, 
//   { expiresIn: "1d" } 
// );    
           
    // build token payload
    const payload = { id: user._id, role: user.role, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });


    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};


// Approve User (Admin Only)
// Helper to generate unique employee code
const generateEmployeeCode = () => {
  const prefix = "EMP";
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit code
  return `${prefix}${random}`;
};

export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find pending user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if already approved
    const existingEmployee = await EmployeeProfile.findOne({ email: user.email });
    if (existingEmployee) {
      return res.status(400).json({ message: "User is already approved as Employee" });
    }

    // Create EmployeeProfile from User
    const employeeProfile = new EmployeeProfile({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      department: user.department,
      position: user.position,
      experience: user.experience,
      education: user.education,
      role: user.role,
      employeeCode: generateEmployeeCode(),
      status: "ACTIVE" // approved employee
    });

    await employeeProfile.save();

    // Delete user from pending User collection
    await user.deleteOne();

    res.status(200).json({
      message: "User approved and added as Employee",
      employeeProfile
    });

  } catch (err) {
    res.status(500).json({ message: "Error approving user", error: err.message });
  }
};

// Rejected User
// rejectUser Controller
 export const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user in pending User collection
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found or already processed" });
    }

    // Delete the pending user (rejected)
    await user.deleteOne();

    res.status(200).json({
      message: "User has been rejected and removed from pending list"
    });

  } catch (err) {
    res.status(500).json({ message: "Error rejecting user", error: err.message });
  }
};
