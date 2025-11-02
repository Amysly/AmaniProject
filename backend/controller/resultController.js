const asyncHandler = require('express-async-handler')
const Results = require('../models/resultsModel')


//add results (admin only)
const createResults = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }

  let { grade, level, session, semester, courses, score, department } = req.body;

  if (score == null || !level || !session || !semester || !courses || !department ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // Compute grade
  if (score >= 70) {
    grade = 'A';
  } else if (score >= 60) {
    grade = 'B';
  } else if (score >= 50) {
    grade = 'C';
  } else if (score >= 40) {
    grade = 'D';
  } else {
    grade = 'F';
  }

  const result = await Results.create({
    session,
    score,
    level,
    courses,
    grade,
    semester,
   department,
    user: req.user.id
  });

  res.status(201).json(result);
});
// Get results for all loggedin users
 const getMyResults = asyncHandler(async (req, res) => {
    const results = await Results.find({ user: req.user.id })
        .populate("department", "departmentName")
        .populate('course', 'courseName courseCode creditUnit')
        .sort({ session: 1, semester: 1 });

    if (!results.length) {
        return res.status(404).json({ message: 'No results found' });
    }

    // Group results by session + semester
    const semesterData = {};
    results.forEach(r => {
        const key = `${r.session}-${r.semester}`;
        if (!semesterData[key]) {
        semesterData[key] = { totalPoints: 0, totalCredits: 0, results: [] };
        }
        const gradePoint = gradeToPoint(r.grade);
        const creditUnit = r.course.creditUnit;
        semesterData[key].totalPoints += gradePoint * creditUnit;
        semesterData[key].totalCredits += creditUnit;
        semesterData[key].results.push(r);
    });

    // Calculate GPA for each semester & CGPA overall
    let totalPointsAll = 0;
    let totalCreditsAll = 0;
    const semesters = Object.keys(semesterData).map(key => {
        const data = semesterData[key];
        const gpa = (data.totalPoints / data.totalCredits).toFixed(2);
        totalPointsAll += data.totalPoints;
        totalCreditsAll += data.totalCredits;
        return {
        semester: key,
        gpa,
        courses: data.results
        };
    });
     const cgpa = (totalPointsAll / totalCreditsAll).toFixed(2);

  res.status(200).json({
    semesters,
    cgpa
  });
});

// Admin: Get all results
const getAllResults = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("Access denied, Admin only");
  }

  const results = await Results.find()
    .populate('user', 'name')
    .populate('courses', 'courseTitle courseCode creditUnit')
    .populate("department", "departmentName");

  res.status(200).json(results);
});

module.exports ={
    createResults,
    getMyResults,
    getAllResults
}