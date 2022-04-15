const express = require('express');
const { signup } = require('../controllers/auth');


const router = express.Router();
const {userSignupValidator} = require('../validators/auth');
const {runValidation} = require('../validators');
router.post('/signup',userSignupValidator,runValidation,signup )










module.exports = router;



