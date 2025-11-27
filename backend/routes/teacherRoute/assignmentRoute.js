const express = require('express');
const router = express.Router()
const {
    createAssignment
}= require('../../controller/teacherController/assignmentController');

const {protect} = require('../../middleware/authMiddleWare')

router.post( '/', protect, createAssignment)

module.exports = router