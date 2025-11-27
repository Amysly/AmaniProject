const asyncHandler = require('express-async-handler');
const Assignment = require('../../models/teacherModels/assignmentModel');

const createAssignment = asyncHandler(async (req, res) => {
      if (!req.user || req.user.role !== 'lecturer') {
    res.status(403);
    throw new Error("You cant create an assignment");
  }
    const {assignmentQuestion, submissionDeadline,level, department, courses} = req.body

     // Validate required fields
    if (!assignmentQuestion || !submissionDeadline || !level
        || !department || !courses) {
        res.status(400)
        throw new Error("please fill in the fields"); 
    }

    const assignment = await Assignment.create({
        assignmentQuestion,
        submissionDeadline: new Date( submissionDeadline),
        level,
        department,
        courses
    })
    res.status(201).json(assignment)
})

module.exports ={
   createAssignment 
}