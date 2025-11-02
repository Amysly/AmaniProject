const asyncHandler = require('express-async-handler');
const CourseRegistration = require('../models/courseRegistration');
const Department = require('../models/departmentModel');
const Course = require('../models/courseModel');

const registerCourses = asyncHandler(async (req, res) => {
  let { session, semester, gender, courses } = req.body;

  // Validate inputs
  if (!session || !semester || !gender || !courses || !courses.length) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // Get department  and matri number from logged-in user
  const departmentId = req.user.department;
  const matriNumber = req.user.matriNumber;
  if (!departmentId) {
    res.status(400);
    throw new Error("User does not have a department assigned");
  }

  if(!matriNumber){
    res.status(400)
    throw new Error("User does not have a matric number assigned")
  }
  //  Prevent duplicate registration
  const existingRegistration = await CourseRegistration.findOne({
    session,
    semester,
    gender,
    user: req.user.id,
  });

  if (existingRegistration) {
    res.status(400);
    throw new Error("You have already registered courses for this semester.");
  }

  //  Fetch department info from DB (since we need credit limits)
  const department = await Department.findById(departmentId);
  if (!department) {
    res.status(404);
    throw new Error("Department not found");
  }

  //  Parse courses if needed
  if (typeof courses === "string") {
    courses = JSON.parse(courses);
  }

  //  Fetch the selected course documents
  const selectedCourses = await Course.find({ _id: { $in: courses } });

  // Calculate total units for the semester
  const totalUnits = selectedCourses.reduce((sum, course) => sum + course.courseUnit, 0);

  // Validate against department credit limits
  if (totalUnits < department.minCreditUnitPerSemester) {
    res.status(400);
    throw new Error(`You must register at least ${department.minCreditUnitPerSemester} units`);
  }

  if (totalUnits > department.maxCreditUnitPerSemester) {
    res.status(400);
    throw new Error(`You cannot register more than ${department.maxCreditUnitPerSemester} units`);
  }

  // Check session total across both semesters
  const otherSemester = semester === "First Semester" ? "Second Semester" : "First Semester";
  const otherReg = await CourseRegistration.findOne({
    session,
    semester: otherSemester,
    gender,
    user: req.user.id,
  }).populate("courses");

  let totalSessionUnits = totalUnits;
  if (otherReg) {
    const otherUnits = otherReg.courses.reduce((sum, course) => sum + course.courseUnit, 0);
    totalSessionUnits += otherUnits;
  }

  if (totalSessionUnits > department.totalCreditUnitPerSession) {
    res.status(400);
    throw new Error(`Total units for the session cannot exceed ${department.totalCreditUnitPerSession}`);
  }

  // Save registration
  const registerCourse = await CourseRegistration.create({
    session,
    semester,
    gender,
    department: departmentId, // store  for reference, but not from body
    courses,
    matriNumber,
    user: req.user.id,
  });

  res.status(201).json(registerCourse);
});

// student registered courses 
const getAllRegisteredCourses = asyncHandler(async (req, res) => {
  const registeredCourses = await CourseRegistration.find({user: req.user.id})
    .populate('user', 'name')
    .populate('courses', 'courseTitle courseCode creditUnit')
    .populate("department", "departmentName");

  res.status(200).json(registeredCourses);
});


module.exports = {
    registerCourses,
    getAllRegisteredCourses
};
