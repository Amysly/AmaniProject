const express = require('express');
const router = express.Router()
const {getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,} = require('../controller/departmentController')

const {protect} = require('../middleware/authMiddleWare')


 router.route('/')
  .get( getDepartments)
  .post(protect, createDepartment);

router.route('/:id')
  .put(protect, updateDepartment)
  .delete(protect, deleteDepartment);

module.exports = router;

