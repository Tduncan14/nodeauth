// validation

const{check} = require('express-validator');


exports.userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('name is required'),


    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('must be a valid email')
    ,

    check('password')
    .not()
    .isEmpty()
    .isLength(6)
    . withMessage( 'password more than 6 letters long')
]


exports.userSigninValidator = [



    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('must be a valid email')
    ,

    check('password')
    .not()
    .isEmpty()
    .isLength(6)
    . withMessage( 'password more than 6 letters long')
]





