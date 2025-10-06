const asyncHandler = require("express-async-handler");
const ImageFile = require("../models/imageModel");
const multer = require("multer");

// Disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
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


const profileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

 // Check if user already has an image
   let existing = await ImageFile.findOne({ user: req.user._id });

  if (existing) {
    // Replace existing
    existing.name = req.file.originalname;
    existing.path = req.file.path;
    existing.mimetype = req.file.mimetype;
    existing.size = req.file.size;
    await existing.save();

    return res.status(200).json({
      message: "Profile image updated successfully",
      image: existing,
    });
  }

  const image = await ImageFile.create({
    name: req.file.originalname,
    path: req.file.path,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });

  res.status(201).json({
    message: "Profile image uploaded successfully",
    image,
  });
});

module.exports = { upload, profileImage };
