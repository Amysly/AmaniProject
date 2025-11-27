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
    department: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Department',
          required: true,
     },

     courses:
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