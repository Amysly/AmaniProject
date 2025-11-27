const asyncHandler = require('express-async-handler');
const CourseRegistration = require('../models/courseRegistration');
const Department = require('../models/departmentModel');
const Course = require('../models/courseModel');
const courseRegistration = require('../models/courseRegistration');

const registerCourses = asyncHandler(async (req, res) => {
  let { session, semester, gender, courses, departmentElectives, outsideElectives } = req.body;

  //  Validate input
  if (!session || !semester || !gender || !courses?.length) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const userId = req.user.id;
  const departmentId = req.user.department;
  const matriNumber = req.user.matriNumber;

  if (!departmentId) throw new Error("User does not have a department assigned");
  if (!matriNumber) throw new Error("User does not have a matric number assigned");

  // Prevent duplicate registration for same session & semester
  const existingRegistration = await CourseRegistration.findOne({
    user: userId,
    session,
    semester
  });

  if (existingRegistration) {
    res.status(400);
    throw new Error("You have already registered courses for this semester.");
  }

  // Fetch department info
  const department = await Department.findById(departmentId);
  if (!department) throw new Error("Department not found");

  // Parse arrays if they come as strings
  if (typeof courses === "string") courses = JSON.parse(courses);
  if (typeof departmentElectives === "string") departmentElectives = JSON.parse(departmentElectives);
  if (typeof outsideElectives === "string") outsideElectives = JSON.parse(outsideElectives);

  // Fetch compulsory courses (main department)
  const mainCourses = await Course.find({
    _id: { $in: courses },
    department: departmentId,
    isElective: false,
    isOutsideElective: false
  });

  // Fetch department electives (within same department)
  const deptElectiveCourses = await Course.find({
    _id: { $in: departmentElectives },
    department: departmentId,
    isElective: true,
    isOutsideElective: false
  });

  // Fetch outside electives (from other allowed departments)
  const outsideElectiveCourses = await Course.find({
    _id: { $in: outsideElectives },
    isOutsideElective: true,
    allowedDepartments: departmentId
  });

  //  Combine all selected courses
  const allSelectedCourses = [
    ...mainCourses,
    ...deptElectiveCourses,
    ...outsideElectiveCourses
  ];

  // Calculate total units
  const totalUnits = allSelectedCourses.reduce((sum, course) => sum + course.courseUnit, 0);

  // Validate credit limits
  if (totalUnits < department.minCreditUnitPerSemester) {
    throw new Error(`You must register at least ${department.minCreditUnitPerSemester} units.`);
  }

  if (totalUnits > department.maxCreditUnitPerSemester) {
    throw new Error(`You cannot register more than ${department.maxCreditUnitPerSemester} units.`);
  }

  // Check total session limit (both semesters)
  const otherSemester = semester === "First Semester" ? "Second Semester" : "First Semester";
  const otherReg = await CourseRegistration.findOne({
    session,
    semester: otherSemester,
    user: userId
  }).populate("courses departmentElectives outsideElectives");

  let totalSessionUnits = totalUnits;
  if (otherReg) {
    const otherUnits = [
      ...otherReg.courses,
      ...otherReg.departmentElectives,
      ...otherReg.outsideElectives
    ].reduce((sum, course) => sum + course.courseUnit, 0);

    totalSessionUnits += otherUnits;
  }

  if (totalSessionUnits > department.totalCreditUnitPerSession) {
    throw new Error(`Total units for the session cannot exceed ${department.totalCreditUnitPerSession}`);
  }

  //  Save registration
  const registration = await CourseRegistration.create({
    user: userId,
    matriNumber,
    department: departmentId,
    session,
    semester,
    gender,
    courses: mainCourses.map(c => c._id),
    departmentElectives: deptElectiveCourses.map(c => c._id),
    outsideElectives: outsideElectiveCourses.map(c => c._id),
    totalUnits
  });

  res.status(201).json({
    message: "Courses registered successfully",
    totalUnits,
    registration
  });
});

// student registered courses 
const getAllRegisteredCourses = asyncHandler(async (req, res) => {
  //Fetch all registrations for this student
  const registeredCourses = await CourseRegistration.find({ user: req.user.id })
    .populate('courses', 'courseTitle courseCode courseUnit')
    .populate('departmentElectives', 'courseTitle courseCode courseUnit')
    .populate('outsideElectives', 'courseTitle courseCode courseUnit')
    .select('session semester courses departmentElectives outsideElectives totalUnits');

  // Handle case where student has no registrations
  if (!registeredCourses.length) {
    return res.status(200).json({ message: 'No registered courses found' });
  }

  // Prepare structured result
  const groupedCourses = {};

  registeredCourses.forEach((registration) => {
    const { session, semester, courses, departmentElectives, outsideElectives } = registration;

    if (!groupedCourses[session]) {
      groupedCourses[session] = {
        semesters: {},
        totalSessionUnits: 0,
      };
    }

    if (!groupedCourses[session].semesters[semester]) {
      groupedCourses[session].semesters[semester] = {
        compulsoryCourses: [],
        departmentElectives: [],
        outsideElectives: [],
        totalSemesterUnits: 0,
      };
    }

    // Format and push courses
    const formattedCourses = courses.map((course) => ({
      courseTitle: course.courseTitle,
      courseCode: course.courseCode,
      courseUnit: course.courseUnit,
    }));

    const formattedDeptElectives = departmentElectives.map((course) => ({
      courseTitle: course.courseTitle,
      courseCode: course.courseCode,
      courseUnit: course.courseUnit,
    }));

    const formattedOutsideElectives = outsideElectives.map((course) => ({
      courseTitle: course.courseTitle,
      courseCode: course.courseCode,
      courseUnit: course.courseUnit,
    }));

    // Calculate semester total units
    const semesterUnits = [
      ...formattedCourses,
      ...formattedDeptElectives,
      ...formattedOutsideElectives
    ].reduce((sum, course) => sum + course.courseUnit, 0);

    // Add to structured result
    groupedCourses[session].semesters[semester].compulsoryCourses.push(...formattedCourses);
    groupedCourses[session].semesters[semester].departmentElectives.push(...formattedDeptElectives);
    groupedCourses[session].semesters[semester].outsideElectives.push(...formattedOutsideElectives);
    groupedCourses[session].semesters[semester].totalSemesterUnits += semesterUnits;

    groupedCourses[session].totalSessionUnits += semesterUnits;
  });

  res.status(200).json(groupedCourses);
});

const updateCourseForm = asyncHandler(async (req,res) => {
  const courseForm = await courseRegistration.findById(req.params.id)
  if (!courseForm) {
    res.status(404);
    throw new Error("You have not registered your courses");
    
  }
const updatedCourseFormReg = await courseRegistration.findByIdAndUpdate(req.params.id,req.body,{
  new:true
})
res.status(200).json(updatedCourseFormReg)
})

module.exports = {
    registerCourses,
    getAllRegisteredCourses,
    updateCourseForm
};
