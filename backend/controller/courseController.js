const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');

// @desc    Get all courses for logged-in user
// @route   GET /api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({ user: req.user.id }).populate('department', 'departmentName');;
    res.status(200).json(courses);
});

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
    const { courseTitle, courseCode, courseUnit, department } = req.body;

    if (!courseTitle || !courseCode || !courseUnit ||  !department) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const course = await Course.create({
        courseTitle,
        courseCode,
        courseUnit,
        department,
        user: req.user.id,
    });

    res.status(201).json(course);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }

    // Check if user owns the course
    if (course.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized");
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedCourse);
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }

    // Check if user owns the course
    if (course.user.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized");
    }

    await course.deleteOne();

    res.status(200).json({ message: 'Course deleted', id: req.params.id });
});

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
};
