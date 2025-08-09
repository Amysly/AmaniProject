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
}, {
    timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);
