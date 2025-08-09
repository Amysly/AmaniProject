const mongoose = require('mongoose');

const courseRegistrationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    }],
    session: {
        type: String,
        required: [true, 'Please enter a session']
    },
    level: {
        type: Number,
        required: [true, 'Please enter a level']
    },
    semester: {
        type: String,
          enum: ['First', 'Second'],
        required: [true, 'Please enter a semester']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CourseRegistration', courseRegistrationSchema);
