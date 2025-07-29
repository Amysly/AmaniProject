const express = require('express')
const router = express.Router()
const { registerUser,
        login,
        getMe
 } = require('../controller/userController')

 const {protect} = require('../middleware/authMiddleWare')

 router.post('/', registerUser)
router.post('/login', login)
router.get('/me', protect, getMe)


module.exports = router