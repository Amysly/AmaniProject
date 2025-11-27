const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');

// @desc    Get all courses for logged-in user
// @route   GET /api/courses
// @access  Private
const getCoursesByStudents = asyncHandler(async (req, res) => {
  // Get department ID from query or logged-in student
  const departmentId = req.query.department || req.user?.department;

  if (!departmentId) {
    res.status(400);
    throw new Error("Department ID not found");
  }
  //filtered courses based on the level
  const studentLevel = req.user.level;


  // All courses in same department
  const allCourses = await Course.find({ 
    department:  departmentId,
    courseLevel:studentLevel,
  });

  // Core courses (not electives, not outside electives)
  const coreCourses = await Course.find({
    department: departmentId,
    courseLevel:studentLevel,
    isElective: false,
    isOutsideElective: false,
  });

  // Departmental electives (same dept)
  const deptElective = await Course.find({
    department: departmentId,
    courseLevel:studentLevel,
      isElective: true,
  isOutsideElective: false

  });


  // Outside electives (offered by other departments)
  const outsideElectives = await Course.find({
    isOutsideElective: true,
    courseLevel:studentLevel,
    allowedDepartments: { $in: [departmentId] },
  }).populate("department", "departmentName");

  if (!allCourses || allCourses.length === 0) {
    res.status(404);
    throw new Error("No courses found for this department");
  }


  res.status(200).json({
    allCourses,       
    coreCourses,
    deptElective,      
    outsideElectives, 
  });
});


const getCoursesByAdmin = asyncHandler(async (req, res) => {
    const courses = await Course.find().populate('department', 'departmentName');;
    res.status(200).json( courses);
});

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }
    const { courseTitle, courseCode, courseUnit,courseLevel, department, 
       isElective = false, isOutsideElective = false,  allowedDepartments =[] } = req.body;

    if (!courseTitle || !courseCode || !courseUnit ||
       !courseLevel || !department || !allowedDepartments) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

//check if course already exist to prevent duplicate
    const existingCourse = await Course.findOne({
            courseTitle,
            courseCode,
            courseUnit,
            courseLevel,
            department,
            isElective ,
            isOutsideElective,
            allowedDepartments,
            user: req.user.id
    });

    if (existingCourse) {
      res.status(400);
      throw new Error("This course has already been created");
      
    }
    const course = await Course.create({
        courseTitle,
        courseCode,
        courseUnit,
        courseLevel,
        department,
         isElective,
        isOutsideElective,
        allowedDepartments,
        user: req.user.id,
    });

    res.status(201).json(course);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
     if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedCourse);
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }
    
    await course.deleteOne();

    res.status(200).json({id: course._id, message: 'Course deleted'});
});

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesByStudents,
    getCoursesByAdmin
};
