const mongoose = require('mongoose')

const resultSchema = mongoose.Schema({
     user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    courses: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course'
        }],
    score: {
        type: Number,
        required: [true, 'Please enter a score']
    },  
    grade: {
        type: String,
        required: [true, 'Please enter a grade']
    },
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

module.exports = mongoose.model('Results', resultSchema)