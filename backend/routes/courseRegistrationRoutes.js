const express = require("express");
const router = express.Router();
const { registerCourses ,
    getAllRegisteredCourses
} = require("../controller/courseRegisterController");
const { protect } = require("../middleware/authMiddleware");

// Protect this route so only logged-in users can access
router.post('/', protect, registerCourses);
router.get('/',protect, getAllRegisteredCourses)

module.exports = router;
