const express = require('express');
const router = express.Router()
const {getCoursesByStudents,
    } = require('../controller/courseController')

const {protect} = require('../middleware/authMiddleWare')

 router.route('/')
  .get(protect, getCoursesByStudents);

module.exports = router;

