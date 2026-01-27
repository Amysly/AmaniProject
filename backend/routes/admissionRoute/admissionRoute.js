const express = require('express')
const router = express.Router()
const {
    createAdmission,
    getAllAdmissionByAdmin
} = require('../../controller/AdmissionController/admissionController')
const {protect} = require('../../middleware/authMiddleWare')

router.route ('/')
.get(protect, getAllAdmissionByAdmin)
.post(createAdmission)
 
module.exports = router