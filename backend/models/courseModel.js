const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
     courseTitle: {
        type: String,
        required: [true, 'Please enter a course code']
    },
    courseCode: {
        type: String,
        required: [true, 'Please enter a course code']
    },
     courseUnit: {
        type: Number,
        required: [true, 'Please enter a course code']
    },
      courseLevel: {
        type: String,
        enum:['100 level', '200 level', '300 level'],
        required: [true, 'Please enter a course level']
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
