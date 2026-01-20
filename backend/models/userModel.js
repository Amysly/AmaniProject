const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
 results:[ 
      {
type: mongoose.Schema.Types.ObjectId,
  ref: 'Results',
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
level: {
        type: String,
       // required: [true, 'Please enter a level']
    },
 matriNumber:{
        type:String,
       // required:[true, 'Please enter your Matriculation Number'],
        unique:true
    },
     staffId: {
      type: String,
      unique: true,
      //required: true,
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
