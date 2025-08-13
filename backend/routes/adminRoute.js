const express = require('express');
const router = express.Router()
const {
    getAllUsers,
    adminCreateUser,
    updateUser,
    deleteUser
} = require('../controller/adminController')

const {protect} = require('../middleware/authMiddleWare')

 router.get( '/', protect, getAllUsers)
    router.post( '/create-user',protect, adminCreateUser);

router.route('/:id')
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
