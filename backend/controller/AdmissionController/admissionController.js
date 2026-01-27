const asyncHandler = require('express-async-handler');
const Admission = require('../../models/Admission/AdmissionModel');

const createAdmission = asyncHandler(async (req, res) => {
  const { personalInfo, enrollmentInfo, religiousEducationInfo } = req.body;

  if (!personalInfo || !enrollmentInfo || !religiousEducationInfo) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Check if admission already exists using email
  const existingAdmission = await Admission.findOne({ "personalInfo.email": personalInfo.email });
  if (existingAdmission) {
    res.status(409); 
    throw new Error("Admission already exists for this email");
  }

  const admission = await Admission.create({
    personalInfo,
    enrollmentInfo,
    religiousEducationInfo
  });

  res.status(201).json({
    message: 'Admission created successfully',
    admission
  });
});

//Get admission by admin
const getAllAdmissionByAdmin = asyncHandler(async (req,res) => {
    if(!req.user || req.user.role !== 'admin'){
        res.status(403);
        throw new Error("Access denied");
    }

    const admission = await Admission.find()
    res.status(200).json({
        totalAdmission:admission.length,
        admission
    })
})
module.exports = {
  createAdmission,
  getAllAdmissionByAdmin
};
