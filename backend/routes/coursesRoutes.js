const express = require('express');
const router = express.Router()
const {getCourses,
    createCourse,
    updateCourse,
    deleteCourse,} = require('../controller/courseController')

const {protect} = require('../middleware/authMiddleWare')


 router.route('/')
  .get( getCourses)
  .post(protect, createCourse);

router.route('/:id')
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;

