const asyncHandler = require('express-async-handler');
const CourseRegistration = require('../models/courseRegistration');
const Department = require('../models/departmentModel');
const Course = require('../models/courseModel');

const registerCourses = asyncHandler(async (req, res) => {
    let { session, semester, level, department: departmentId, courses } = req.body;

    if (!session || !semester || !level || !departmentId || !courses || !courses.length) {
        res.status(400);
        throw new Error("Please fill all fields and select at least one course");
    }

    // Check if already registered for this semester
    const existingRegistration = await CourseRegistration.findOne({
        session,
        semester,
        level,
        department: departmentId,
        user: req.user.id
    });

    if (existingRegistration) {
        res.status(400);
        throw new Error("You have already registered courses for this semester and level.");
    }

    // Fetch department
    const department = await Department.findById(departmentId);
    if (!department) {
        res.status(404);
        throw new Error("Department not found");
    }

    //if it is a string parse it.
    if (typeof courses === 'string') {
        courses = JSON.parse(courses)
        
    }
    // Fetch selected courses
    const selectedCourses = await Course.find({ _id: { $in: courses } });

    // Calculate total units for the semester
    const totalUnits = selectedCourses.reduce((sum, course) => sum + course.courseUnit, 0);

    // Check min/max per semester
    if (totalUnits < department.minCreditUnitPerSemester) {
        res.status(400);
        throw new Error(`You must register at least ${department.minCreditUnitPerSemester} units`);
    }
    if (totalUnits > department.maxCreditUnitPerSemester) {
        res.status(400);
        throw new Error(`You cannot register more than ${department.maxCreditUnitPerSemester} units`);
    }

    // Check total per session across both semesters
    const otherSemester = semester === 'First' ? 'Second' : 'First';
    const otherReg = await CourseRegistration.findOne({
        session,
        semester: otherSemester,
        level,
        department: departmentId,
        user: req.user.id
    }).populate('courses');

    let totalSessionUnits = totalUnits;
    if (otherReg) {
        const otherUnits = otherReg.courses.reduce((sum, course) => sum + course.courseUnit, 0);
        totalSessionUnits += otherUnits;
    }

    if (totalSessionUnits > department.totalCreditUnitPerSession) {
        res.status(400);
        throw new Error(`Total units for the session cannot exceed ${department.totalCreditUnitPerSession}`);
    }

    // Create the registration
    const registerCourse = await CourseRegistration.create({
        session,
        semester,
        level,
        department: departmentId,
        courses,
        user: req.user.id
    });

    res.status(201).json(registerCourse);
});

module.exports = {
    registerCourses
};
