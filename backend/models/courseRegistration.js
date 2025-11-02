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
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
  ],
  session: {
    type: String,
    required: [true, 'Please enter a session'],
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
}, { timestamps: true });

// Prevent duplicate registration for same user/session/semester
courseRegistrationSchema.index(
  { user: 1, session: 1, semester: 1 },
  { unique: true }
);

module.exports = mongoose.model('CourseRegistration', courseRegistrationSchema);
