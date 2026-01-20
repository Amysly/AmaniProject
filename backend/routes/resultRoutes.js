const express = require('express');
const router = express.Router()
const {createResults,
    getMyResults,
    getAllResults,createAssignmentRecord,
    getAllResultsByLecturer} = require('../controller/resultController')

const {protect} = require('../middleware/authMiddleWare')

 router.route('/')
  .get( protect, getAllResults)
  .get(protect, getAllResultsByLecturer)
  .post(protect, createResults)
  .post(protect, createAssignmentRecord);


module.exports = router;

