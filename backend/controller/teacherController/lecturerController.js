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

  //  Get lecturer assignments
  const lecturerAssignments = await LecturerCourseAssignment.find({
    lecturer: req.user._id
  });

  if (!lecturerAssignments.length) {
    return res.status(200).json({
      totalStudents: 0,
      students: []
    });
  }

  //  Collect course IDs
  const courseIds = lecturerAssignments.flatMap(a => a.courses);

  //  Use session & semester from assignments
  const sessions = lecturerAssignments.map(a => a.session);
  const semesters = lecturerAssignments.map(a => a.semester);

  //  Find students registered for those courses
  const registrations = await courseRegistration.find({
    session: { $in: sessions },
    semester: { $in: semesters },
    $or: [
      { courses: { $in: courseIds } },
      { departmentElectives: { $in: courseIds } },
      { outsideElectives: { $in: courseIds } }
    ]
  }).populate("user", "-password");

  //  Extract students safely
  const students = registrations
    .map(r => r.user)
    .filter(u => u?.role === "student");

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
  uploadCourseMaterial,
};
