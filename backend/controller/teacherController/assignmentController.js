const asyncHandler = require('express-async-handler');
const Assignment = require('../../models/teacherModels/assignmentModel');
const Course = require('../../models/courseModel');
const LecturerCourseAssignment = require('../../models/teacherModels/lecturerCourseAssignment')

//GET ALL ASSIGNMENTS
const getAssignments = asyncHandler(async (req,res) => {

    if (req.user.role !== 'lecturer') {
    res.status(403);
    throw new Error("Not Allowed");
  }
const {coursesId} = req.params
//Check if lecturer is assigned to this course
  const lecturerAssignment = await LecturerCourseAssignment.findOne({
    lecturer: req.user._id,
    courses: course
  });

  if (!lecturerAssignment) {
    res.status(403);
    throw new Error("You are not assigned to this course");
  }
  const assignments = await Assignment.find({coursesId})

  if (!assignments || assignments.length === 0) {
    res.status(404)
    throw new Error("No assignment found");
    
  }
  res.status(200).json(assignments)

})

//Lecturer Create assignment for students
const createStudentAssignment = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "lecturer") {
    res.status(403);
    throw new Error("Not allowed");
  }

  const { assignmentQuestion, submissionDeadline, level, 
    course,session,semester } = req.body;

  // Validate input
  if (!assignmentQuestion || !submissionDeadline || !level
     || !course ||!semester || !session ) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  //Check if lecturer is assigned to this course
  const lecturerAssignment = await LecturerCourseAssignment.findOne({
    lecturer: req.user._id,
    courses: course,
    session,
    semester,
  });

  if (!lecturerAssignment) {
    res.status(403);
    throw new Error("You are not assigned to this course");
  }

  // Create assignment
  const assignment = await Assignment.create({
    assignmentQuestion,
   submissionDeadline: new Date(submissionDeadline),
    level,
    course,
    lecturer: req.user._id,
    session,
    semester,
    department: lecturerAssignment.department,
  });

  res.status(201).json({
    message: "Assignment created successfully",
    assignment
  });
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
  const lecturerAssignment = await LecturerCourseAssignment.findOne({
    lecturer: req.user._id,
     course: assignment.courses,
     semester: assignment.semester,
     session: assignment.session
  });

  if (!lecturerAssignment) {
    res.status(403);
    throw new Error("You cannot update an assignment for a course you are not assigned to.");
  }

  const updatedAssignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    updatedAssignment,
    message:"assignment updated"
  });
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
  const lecturerAssignment = await LecturerCourseAssignment.findOne({
    lecturer: req.user._id,
     course: assignment.courses,
     semester: assignment.semester,
     session: assignment.session
  });


  if (!lecturerAssignment) {
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
 createStudentAssignment,
  updateAssignment,
  deleteAssignment
};
