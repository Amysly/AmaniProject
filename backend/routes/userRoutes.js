const express = require('express');
const router = express.Router();
const { 
  registerUser,
  updateProfileImage,
  login,
  getMe
} = require('../controller/userController');

const { protect } = require('../middleware/authMiddleWare');
const multer = require('multer');
const path = require('path'); 


// === Multer setup ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // <-- one level up
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, '-')); // safer filename
  }
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png files are allowed"), false);
    }
  },
});

// === Routes ===
router.post('/', registerUser);
router.post('/login', login);
router.get('/me', protect, getMe);

// Profile image upload (protected route)
router.post(
  '/profile',
  protect,
  upload.single('profileImage'), // multer middleware
  updateProfileImage             // controller function
);

module.exports = router;
