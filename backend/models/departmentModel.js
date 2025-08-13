const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    departmentName: {
        type: String,
        required: [true, 'Please enter a department name']
    },
    totalCreditUnitPerSession: {
        type: Number,
        required: [true, 'Please enter a a total credit number for a department']
    },
    minCreditUnitPerSemester: {
        type: Number,
        required: [true, 'Please enter the minimum credit unit for a semester']
    },
     maxCreditUnitPerSemester: {
        type: Number,
        required: [true, 'Please enter the maximum credit unit for a semester']
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);
