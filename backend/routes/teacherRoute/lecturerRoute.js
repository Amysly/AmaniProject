const express = require('express')
const router = express.Router()
const {
   getStudentAssignedToCourses
} = require('../../controller/teacherController/lecturerController')

const { protect } = require('../../middleware/authMiddleWare')

router.route('/')

.get(protect, getStudentAssignedToCourses)
module.exports = router;