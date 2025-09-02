import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from './routes/taskRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import leaveRoutes from "./routes/leaveRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import documentRoutes   from  "./routes/documentRoutes.js";




const app = express();
connectDB();

//  Middleware to parse JSON 
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);          // User Routes
app.use("/api/employee", employeeRoutes);   // Employee Routes
app.use('/api/task', taskRoutes);        // Task Routes
app.use('/api/attendance', attendanceRoutes); // Attendance Routes
app.use("/api/leaves", leaveRoutes);      // Leave Routes
app.use("/api/achievements", achievementRoutes); //achievements
app.use("/uploads", express.static("uploads"));   // Serve uploaded files statically (optional)
app.use("/api/documents", documentRoutes);    // documents routes


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
