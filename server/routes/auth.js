const express = require('express');
const { signup,accountActivation} = require('../controllers/auth');


const router = express.Router();
const {userSignupValidator} = require('../validators/auth');
const {runValidation} = require('../validators');

router.post('/signup',userSignupValidator,runValidation,signup )


router.post('/account-activation',accountActivation)








module.exports = router;



