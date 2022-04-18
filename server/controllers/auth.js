const User = require('../models/user');
const jwt = require('jsonwebtoken');
// sendgrid
const sendgrid = require('@sendgrid/mail');


// sendgrid code
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

// without the email

// exports.signup =  async (req,res) => {

//         const {name,email,password} = req.body

//         // seeing if user exist or doesn't

//      await User.findOne({email:email}).exec((err,user) =>{


//                 if(user){
//                         return res.status(400).json({error:'email is taken'})
//                 }


//         })


//         // saving the user

//         let newUser = new User({name,email,password});

//        await  newUser.save((err,success) =>{

//                 if(err){
//                         console.log('signup error',err)
//                         return res.status(400).json({error:err})
//                 }


//                 res.json({
//                         user:newUser
//                 })
//         })


     


//         // console.log('reg body',req.body)
    

//         // res.json({
//         //      data:'you hit signup endpointssss'
//         // })
    

// }


// with the email validation



exports.signup = (req,res) => {

       const  {name,email,password} = req.body


       // see if the user exist
       User.findOne({email}).exec((err,user) =>{

        //if the user exist
          if(user){
                  return res.status(400).json({
                          error:"Email is taken"
                  })
          }
          // generate a token to email


          const token = jwt.sign({name,email,password}, process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'10m'})


        //  setting up the email sending codes
          const emailData = {
 
                 from:process.env.EMAIL_FROM,
                 to:email,
                 subject:'Account activation link',
                 html:`
                 <p> ${name}, Please use the following link to activate your account </p>
                 <p>${process.env.CLIENT_URL}/auth/activate/${token} </p>
                 <p> This email may contain sensitive information </p>
                 <p> ${process.env.CLIENT_URL} </p>
                 `
          }

            sendgrid.send(emailData).then(sent => {
                    console.log('SIGN Email sent',sendgrid)
                    return res.json({
                            msg:`Email has ben sent to ${email}, follow the instruction to activate your account`
                    })
            })
            .catch(err =>{
                    console.log(err)
                    res.json({
                            msg:`this the error ${err}`
                    })
            }) 

       })


       let newUser = new User (req.body)

}



exports.accountActivation = (req,res) => {

        const{token} = req.body

        if(token){
                jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION, function(err,decoded){

                        if(err){
                                console.log(err,'JWT Verify account error')
                                res.status(401).json({
                                        error:'expired link.sign up again'
                                })
                                return
                        }


                        const {name,email,password} = jwt.decode(token)
                        // save the user in the database

                        const user = new User({name,email,password})

                        user.save((err,user) => {

                                if(err){
                                        console.log(`save user in account activation error`,err)
                                        return res.status(401).json({
                                             error:'Error saving the user in database. Try sign up again'   
                                        })
                                }

                                return res.json({
                                        message:'Sign up success',
                                        user: user
                                })
                        })



                })
        }

        else{
              return res.json({

                message:'something went wrong, try again'
              })
        }


}