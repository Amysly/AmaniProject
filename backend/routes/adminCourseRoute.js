const express = require('express');
const router = express.Router()
const {
    getCoursesByAdmin,
    createCourse,
    updateCourse,
    deleteCourse,} = require('../controller/courseController')

const {protect} = require('../middleware/authMiddleWare')

 router.route('/')
  .get(protect,  getCoursesByAdmin)
  .post(protect, createCourse);
 

router.route('/:id')
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
