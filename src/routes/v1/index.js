const express = require("express");
const router = express.Router();

// Import route files
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const studentRoutes = require("./student.routes");
const teacherRoutes = require("./teacher.routes");


// Use routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);




module.exports = router;