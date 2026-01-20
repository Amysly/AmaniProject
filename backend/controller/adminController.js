const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const LecturerCourseAssignment = require('../models/teacherModels/lecturerCourseAssignment')
const Course = require('../models/courseModel');
const { populate } = require('dotenv');



// @desc    Get all login users
// @route   GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }
    const user = await User.find()
    res.status(200).json(user);
});


const getUserById = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }

  const userId = req.params.id;

  const user = await User.findById(userId)
    .populate("department", "departmentName")
    .populate({
      path: "results",
      populate: [
        { path: "courses", select: "courseTitle courseCode creditUnit" },
        { path: "department", select: "departmentName" }
      ],
    });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // response to match frontend StudentData type
  const response = {
    _id: user._id,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    },
    department: user.department,
    results: user.results || [],
  };

  res.status(200).json(response);
});


// @desc    Create a new user (Admin only)
// @route   POST /api/users/admin-create
// @access  Private/Admin
const adminCreateUser = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }

  const { name, email, password, role, level, matriNumber, department, staffId } =
    req.body;

  // COMMON FIELDS FOR ALL USERS
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Name, email, password and role are required");
  }

  // ROLE-BASED VALIDATION
  if (role === "student") {
    if (!level || !matriNumber || !department) {
      res.status(400);
      throw new Error("Students must have level, matric number and department");
    }
  }

  if (role === "lecturer") {
    if (!staffId || !department) {
      res.status(400);
      throw new Error("Lecturers must have staff ID and department");
    }
  }

  if (role === "admin") {
    // Admin only needs name, email, password, role
    // (department, level, etc. are NOT required)
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    level,
    matriNumber,
    staffId,
    department,
    role,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    level: user.level,
    matriNumber: user.matriNumber,
    staffId: user.staffId,
    department: user.department,
    role: user.role,
    token: generateToken(user._id),
  });
});


// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await User.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: 'A user was deleted', id: req.params.id });
});


//Admin assigned courses to lecturers

const adminAssignCoursesToLecturers = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }

  let { lecturerId, courses, session, semester } = req.body;

  
  if (typeof courses === "string") courses = JSON.parse(courses);

  if (
    !lecturerId ||
    courses.length === 0 ||
    !session ||
    !semester
  ) {
    res.status(400);
    throw new Error("Lecturer, courses, session and semester are required");
  }

  const lecturer = await User.findById(lecturerId);
  if (!lecturer || lecturer.role !== "lecturer") {
    res.status(404);
    throw new Error("Lecturer not found");
  }

  if (!lecturer.department) {
    res.status(400);
    throw new Error("Lecturer has no department assigned");
  }

  const foundCourses = await Course.find({
    _id: { $in: courses }
  });

  if (foundCourses.length !== courses.length) {
    res.status(404);
    throw new Error("One or more courses not found");
  }


  const invalidCourse = foundCourses.find(
    course =>
      course.department.toString() !== lecturer.department.toString()
  );

  if (invalidCourse) {
    res.status(400);
    throw new Error("Cannot assign courses outside lecturer's department");
  }

  const existingCourses = await LecturerCourseAssignment.findOne({
    lecturer: lecturerId,
    semester,
    session,
    courses: { $in: courses }
  });

  if (existingCourses) {
    res.status(400);
    throw new Error("One or more courses already assigned for this session");
  }

  const assignment = await LecturerCourseAssignment.create({
    lecturer: lecturerId,
    department: lecturer.department,
    courses,
    semester,
    session
  });

  res.status(201).json({
    message: "Courses assigned to lecturer successfully",
    assignment
  });
});



module.exports = { 
  getAllUsers,
  getUserById,
  adminCreateUser,
  updateUser,
  deleteUser,
  adminAssignCoursesToLecturers
};
