const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, 'Please enter a course title'],
    },
    courseCode: {
      type: String,
      required: [true, 'Please enter a course code'],
    },
    courseUnit: {
      type: Number,
      required: [true, 'Please enter the course unit'],
    },
    courseLevel: {
      type: String,
      enum: ['100 level', '200 level', '300 level', '400 level'],
      required: [true, 'Please select a course level'],
    },
    courseMaterials: [
      {
        type: String,
      },
    ]
    ,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    //  Mark if this course is an elective at all
    isElective: {
      type: Boolean,
      default: false,
    },

    // Mark if it’s an *outside elective* (open to other departments)
    isOutsideElective: {
      type: Boolean,
      default: false,
    },

    // Optionally: specify which departments can take this course as an elective
    allowedDepartments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
