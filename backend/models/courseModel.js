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
