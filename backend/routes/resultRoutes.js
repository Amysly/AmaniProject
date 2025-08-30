const express = require('express');
const router = express.Router()
const {createResults,
    getMyResults,
    getAllResults} = require('../controller/resultController')

const {protect} = require('../middleware/authMiddleWare')

 router.route('/')
  .get( protect, getAllResults)
  .post(protect, createResults);

router.route('/:id')
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;

