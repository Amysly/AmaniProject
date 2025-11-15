const mongoose = require('mongoose');

const courseRegistrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Department',
  },
  // Compulsory department courses
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  ],

  //Department electives (offered within student's department)
  departmentElectives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],

  // Outside electives (offered by other departments)
  outsideElectives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],

  session: {
    type: String,
    required: [true, 'Please enter a session (e.g. 2024/2025)'],
  },
  semester: {
    type: String,
    enum: ['First Semester', 'Second Semester'],
    required: [true, 'Please enter a semester'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: [true, 'Please enter your gender'],
  },

  totalUnits: {
    type: Number,
    default: 0, // Optional: store total credit units directly
  },
}, { timestamps: true });

// Prevent duplicate registration for same user/session/semester
courseRegistrationSchema.index(
  { user: 1, session: 1, semester: 1 },
  { unique: true }
);

module.exports = mongoose.model('CourseRegistration', courseRegistrationSchema);
