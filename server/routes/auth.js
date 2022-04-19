const express = require('express');
const { signup,accountActivation,signin} = require('../controllers/auth');


const router = express.Router();
const {userSignupValidator,userSigninValidator} = require('../validators/auth');
const {runValidation} = require('../validators');

router.post('/signup',userSignupValidator,runValidation,signup )


router.post('/account-activation',userSigninValidator,runValidation,accountActivation)

router.post('/signin',signin)






module.exports = router;



