const asyncHandler = require("express-async-handler");
const Results = require("../models/resultsModel");
const Course = require("../models/courseModel");
const User = require("../models/userModel");


// ADMIN or LECTURER: Create Full Result

const createResults = asyncHandler(async (req, res) => {
  const { name, courseId, department, session, semester, level, score,} =
    req.body;

  if (!name || !courseId || !department || !session || !semester || !level) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // If lecturer is creating result — ensure they own the course
  if (req.user.role === "lecturer") {
    const course = await Course.findOne({
      _id: courseId,
      assignedLecturer: req.user.id
    });

    if (!course) {
      res.status(403);
      throw new Error("You are not assigned to this course");
    }
  }

  

  const result = await Results.create({
    user: name,
    course: courseId,
    department,
    session,
    semester,
    level,
    score: score || 0
  });

  res.status(201).json(result);
});


// LECTURER: Submit only Test + Assignment

const createAssignmentRecord = asyncHandler(async (req, res) => {
  if (req.user.role !== "lecturer") {
    res.status(403);
    throw new Error("Not Allowed");
  }

  const { name, courseId, firstTest, secondTest, 
    assignmentScores, session, semester, level,department} = req.body;

  if (!name || !courseId || !firstTest || !secondTest || !assignmentScores
    || !session || !semester || !level || !department
  ) {
    res.status(400);
    throw new Error("please fill in all the required fields");
  }

  const course = await Course.findOne({
    _id: courseId,
    assignedLecturer: req.user.id,
  });

  if (!course) {
    res.status(403);
    throw new Error("You are not assigned to this course.");
  }

  const createAssRecord= await Results.create({
    user: name,
    course: courseId,
    department: course.department,
    session: course.session,
    semester: course.semester,
    level: course.courseLevel,
    testScores: {
      firstTest: firstTest || 0,
      secondTest: secondTest || 0,
    },
    assignmentScores: assignmentScores || 0,
  });

  res.status(201).json(createAssRecord);
});

// STUDENT: Get My Results + GPA/CGPA

const getMyResults = asyncHandler(async (req, res) => {
  const results = await Results.find({ user: req.user.id })
    .populate("department", "departmentName")
    .populate("course", "courseTitle courseCode creditUnit")
    .sort({ session: 1, semester: 1 });

  if (!results.length) {
    return res.status(404).json({ message: "No results found" });
  }

  const semesterData = {};

  const gradeToPoint = (grade) => {
    const map = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
    return map[grade] ?? 0;
  };

  results.forEach((r) => {
    const key = `${r.session}-${r.semester}`;

    if (!semesterData[key]) {
      semesterData[key] = {
        totalPoints: 0,
        totalCredits: 0,
        results: [],
      };
    }

    const creditUnit = r.course.creditUnit;
    const gradePoint = gradeToPoint(r.grade);

    semesterData[key].totalPoints += gradePoint * creditUnit;
    semesterData[key].totalCredits += creditUnit;
    semesterData[key].results.push(r);
  });

  let totalPointsAll = 0;
  let totalCreditsAll = 0;

  const semesters = Object.keys(semesterData).map((key) => {
    const data = semesterData[key];
    const gpa = (data.totalPoints / data.totalCredits).toFixed(2);

    totalPointsAll += data.totalPoints;
    totalCreditsAll += data.totalCredits;

    return {
      semester: key,
      gpa,
      courses: data.results,
    };
  });

  const cgpa = (totalPointsAll / totalCreditsAll).toFixed(2);

  res.status(200).json({ semesters, cgpa });
});


// ADMIN: Get All Results
const getAllResults = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(403);
    throw new Error("Admin Only");
  }

  const results = await Results.find()
    .populate("user", "name email")
    .populate("course", "courseTitle courseCode creditUnit")
    .populate("department", "departmentName");

  res.status(200).json(results);
});


// LECTURER: Get Results Only for Their Course

const getAllResultsByLecturer = asyncHandler(async (req, res) => {
  if (req.user.role !== "lecturer") {
    res.status(403);
    throw new Error("Not Allowed");
  }

  const { coursesId } = req.params;

  const course = await Course.findOne({
    _id: coursesId,
    assignedLecturer: req.user.id,
  });

  if (!course) {
    res.status(403);
    throw new Error("You are not assigned to this course.");
  }

  const results = await Results.find({ course: coursesId })
    .populate("user", "name email")
    .populate("course", "courseTitle courseCode creditUnit")
    .populate("department", "departmentName");

  res.status(200).json(results);
});

module.exports = {
  createResults,
  createAssignmentRecord,
  getMyResults,
  getAllResults,
  getAllResultsByLecturer,
};
