
const mongoose = require('mongoose')

const lecturerCourseAssignmentSchema = new mongoose.Schema(
    {
    lecturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
        },
    
     courses: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
             required: true
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
    },
    { timestamps: true });

    lecturerCourseAssignmentSchema.index(
    {lecturer:1, session:1, semester:1},
    {unique:true}
);

module.exports = mongoose.model('LecturerCourseAssignment', lecturerCourseAssignmentSchema)