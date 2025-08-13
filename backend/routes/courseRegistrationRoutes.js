const express = require("express");
const router = express.Router();
const { registerCourses } = require("../controller/courseRegisterController");
const { protect } = require("../middleware/authMiddleware");

// Protect this route so only logged-in users can access
router.post('/', protect, registerCourses);

module.exports = router;
