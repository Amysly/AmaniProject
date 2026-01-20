const asyncHandler = require('express-async-handler');
const Assignment = require('../../models/teacherModels/assignmentModel');
const Course = require('../../models/courseModel');

//GET ALL ASSIGNMENTS
const getAssignments = asyncHandler(async (req,res) => {

    if (req.user.role !== 'lecturer') {
    res.status(403);
    throw new Error("Not Allowed");
  }
const {coursesId} = req.params
   // Check that lecturer is assigned to the course
  const course = await Course.findOne({
    _id: coursesId,
    assignedLecturer: req.user.id,
  });

  if (!course) {
    res.status(403);
    throw new Error("You are not assigned to this course.");
  }
  const assignments = await Assignment.find({coursesId})

  if (!assignments || assignments.length === 0) {
    res.status(404)
    throw new Error("No assignment found");
    
  }
  res.status(200).json(assignments)

})

// CREATE ASSIGNMENT
const createAssignment = asyncHandler(async (req, res) => {

  // Only lecturers can create assignments
  if (req.user.role !== 'lecturer') {
    res.status(403);
    throw new Error("Not Allowed");
  }

  const {
    assignmentQuestion,
    submissionDeadline,
    level,
    coursesId
  } = req.body;

  // Validate required fields
  if (
    !assignmentQuestion ||
    !submissionDeadline ||
    !level ||
    !coursesId
  ) {
    res.status(400);
    throw new Error("Please fill in all required fields.");
  }

  // Check that lecturer is assigned to the course
  const course = await Course.findOne({
    _id: coursesId,
    assignedLecturer: req.user.id,
  });

  if (!course) {
    res.status(403);
    throw new Error("You are not assigned to this course.");
  }

  const assignment = await Assignment.create({
    assignmentQuestion,
    submissionDeadline: new Date(submissionDeadline),
    level,
    coursesId,
    createdBy: req.user.id,
  });

  res.status(201).json(assignment);
});


// UPDATE ASSIGNMENT
const updateAssignment = asyncHandler(async (req, res) => {

  // Only lecturers allowed
  if (req.user.role !== 'lecturer') {
    res.status(403);
    throw new Error("You are not authorized to update this assignment");
  }

  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    res.status(404);
    throw new Error("Assignment not found");
  }

  // Ensure lecturer owns the course this assignment belongs to
  const course = await Course.findOne({
    _id: assignment.coursesId,
    assignedLecturer: req.user.id,
  });

  if (!course) {
    res.status(403);
    throw new Error("You cannot update an assignment for a course you are not assigned to.");
  }

  const updatedAssignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedAssignment);
});


// DELETE ASSIGNMENT
const deleteAssignment = asyncHandler(async (req, res) => {

  if (req.user.role !== 'lecturer') {
    res.status(403);
    throw new Error("You are not authorized to delete this assignment");
  }

  const assignment = await Assignment.findById(req.params.id);

  if (!assignment) {
    res.status(404);
    throw new Error("Assignment not found");
  }

  // Ensure lecturer owns the course
  const course = await Course.findOne({
    _id: assignment.coursesId,
    assignedLecturer: req.user.id,
  });

  if (!course) {
    res.status(403);
    throw new Error("You cannot delete an assignment for a course you are not assigned to.");
  }

  await assignment.deleteOne();

  res.status(200).json({
    id: assignment._id,
    message: "Assignment deleted successfully",
  });
});

module.exports = {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
};
