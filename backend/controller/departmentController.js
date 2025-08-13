const asyncHandler = require('express-async-handler');
const Department = require('../models/departmentModel');

// @desc    Get all departments for logged-in user
// @route   GET /api/departments
// @access  Private
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({ user: req.user.id });
  res.status(200).json(departments);
});

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private
const createDepartment = asyncHandler(async (req, res) => {
  const { departmentName,  totalCreditUnitPerSession, 
    minCreditUnitPerSemester, maxCreditUnitPerSemester } = req.body;

  if (!departmentName || !totalCreditUnitPerSession || 
    !minCreditUnitPerSemester || !maxCreditUnitPerSemester) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const department = await Department.create({
    departmentName,
    totalCreditUnitPerSession,
    minCreditUnitPerSemester,
    maxCreditUnitPerSemester,
    user: req.user.id,
  });

  res.status(201).json(department);
});

// @desc    Update a department
// @route   PUT /api/departments/:id
// @access  Private
const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    res.status(404);
    throw new Error('Department not found');
  }

  if (department.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }

  const updated = await Department.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updated);
});

// @desc    Delete a department
// @route   DELETE /api/departments/:id
// @access  Private
const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    res.status(404);
    throw new Error('Department not found');
  }

  if (department.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }

  await department.deleteOne();

  res.status(200).json({ message: 'Department deleted', id: req.params.id });
});

module.exports = {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
