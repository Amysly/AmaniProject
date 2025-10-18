const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    results:[ 
      {
type: mongoose.Schema.Types.ObjectId,
  ref: 'Result',
}],
  name: {
    type: String,
    required: [true, 'please add a name']
  },
  email: {
    type: String,
    required: [true, 'please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please add a password']
  },
  role: {
    type: String,
    enum: ["student", "lecturer", "admin"],
    default: 'student'
  },
  profileImage: {
    type: String, // will just store file path e.g. "uploads/172789-photo.jpg"
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
