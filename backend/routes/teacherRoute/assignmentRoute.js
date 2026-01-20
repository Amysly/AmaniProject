const express = require('express');
const router = express.Router()
const {
    createAssignment,
    getAssignments,
    updateAssignment,
    deleteAssignment
}= require('../../controller/teacherController/assignmentController');

const {protect} = require('../../middleware/authMiddleWare')
router.route('/')
.get(protect,  getAssignments)
.post(protect, createAssignment)

router.route('/:id')
  .put(protect,  updateAssignment)
  .delete(protect, deleteAssignment);


module.exports = router