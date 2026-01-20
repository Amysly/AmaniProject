const asyncHandler = require('express-async-handler');
const Course = require('../../models/courseModel');
const LecturerCourseAssignment = require('../../models/teacherModels/lecturerCourseAssignment')
const  courseRegistration = require('../../models/courseRegistration')
 
// GET STUDENTS ASSIGNED TO LECTURER'S COURSES
const getStudentAssignedToCourses = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "lecturer") {
    res.status(403);
    throw new Error("Not allowed");
  }

  //  Get courses assigned to the lecturer
  const lecturerCourses = await LecturerCourseAssignment.find({
    lecturer: req.user._id
  });

  if (!lecturerCourses.length) {
    return res.status(200).json({
      totalStudents: 0,
      students: []
    });
  }

  //  Extract course IDs
  const courseIds = lecturerCourses.flatMap(a => a.courses);

  //  Get students registered for those courses
  const studentsTakingCourse = await courseRegistration.find({
    courses: { $in: courseIds }
  }).populate("user", "-password");

  //  Extract users (students)
 const students = studentsTakingCourse
  .map(r => r.user)
  .filter(user => user.role === "student");


  res.status(200).json({
    totalStudents: students.length,
    students
  });
});


const uploadCourseMaterial = asyncHandler(async (req, res) => {
    const {courseId} = req.params;
  if (!req.file) {
    res.status(400);
    throw new Error("No PDF file found");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error("course not found");
  }

  // File path
  const pdfPath = `/uploads/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${pdfPath}`;

  // Update teacher's course material field
  course.uploadCourseMaterials.push(fullUrl);

  await course.save();

  res.status(200).json({
    message: "Course material uploaded successfully",
    course
  });
});


module.exports = {                                                                                                                                                                                                                                                                                 
  getStudentAssignedToCourses,
  uploadCourseMaterial
};
