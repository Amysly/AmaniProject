const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema(
   {
    assignmentQuestion:{
        type:String,
        required: [true, 'Please write down the assigment question'],
    },

    submissionDeadline:{
        type:Date,
         required: [true, 'Please provide a submission deadline'],
    },

    level: {
        type: String,
        required: [true, 'Please enter a level']
    },
     session: {
    type: String,
    required: [true, 'Please enter a session (e.g. 2024/2025)'],
  },
  semester: {
    type: String,
    enum: ['First Semester', 'Second Semester'],
    required: [true, 'Please enter a semester'],
  },
    
     course:
         {
           type: mongoose.Schema.Types.ObjectId,
           required: true,
           ref: 'Course',
         },
   },
     {
    timestamps: true,
  }

)

module.exports = mongoose.model('Assignment', assignmentSchema)