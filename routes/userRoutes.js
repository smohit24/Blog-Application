const express = require('express');
const { getAllUsers, registerControllers, loginControllers } = require('../controllers/userControllers');

//routes object

const router = express.Router()
//get allusers|| get
router.get('/all-users', getAllUsers)
//create user||post
router.post('/register', registerControllers)

//login ||post
router.post('/login',loginControllers)

module.exports = router;