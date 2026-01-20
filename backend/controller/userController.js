const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/user
const registerUser = asyncHandler(async (req, res) => {
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
    if (!staffId) {
      res.status(400);
      throw new Error("Lecturers must have staff ID");
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
    throw new Error('User already exists');
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

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      level: user.level,
      matriNumber:user.matriNumber,
      staffId: user.staffId,
      department : user.department,
      role: user.role, // send role back in response too
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const updateProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No image file uploaded");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Build full URL
  const imagePath = `/uploads/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${imagePath}`;

  user.profileImage = fullUrl;
  await user.save();

  res.status(200).json({
    message: "Profile image updated",
    profileImage: user.profileImage,
  });
});


// Login 
const login = asyncHandler(async (req, res) => {
  const { matriNumber, staffId, password } = req.body;

  if (!password || (!matriNumber && !staffId)) {
    res.status(400);
    throw new Error("Provide password and either matric number or staff ID");
  }

  let user;

  if (staffId) {
    user = await User.findOne({staffId:  staffId.toUpperCase() });
  } else if (matriNumber) {
    user = await User.findOne({ matriNumber: matriNumber.toUpperCase() });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      level: user.level,
      matriNumber: user.matriNumber,
      staffId: user.staffId,
      department: user.department,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Get logged-in user (placeholder)
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("department", "departmentName");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});


module.exports = {
  registerUser,
  login,
  getMe,
  updateProfileImage,
};
