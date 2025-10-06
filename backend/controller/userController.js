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
  const { name, email, password, role } = req.body; 

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
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
    role, 
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
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
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (user &&(await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
             role: user.role,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("invalid data");
        
    }
});

// Get logged-in user (placeholder)
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
});

module.exports = {
  registerUser,
  login,
  getMe,
  updateProfileImage,
};
