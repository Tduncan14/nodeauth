const User = require('../models/user');

exports.signup =  async (req,res) => {

        const {name,email,password} = req.body

        // seeing if user exist or doesn't

     await User.findOne({email:email}).exec((err,user) =>{


                if(user){
                        return res.status(400).json({error:'email is taken'})
                }


        })


        // saving the user

        let newUser = new User({name,email,password});

       await  newUser.save((err,success) =>{

                if(err){
                        console.log('signup error',err)
                        return res.status(400).json({error:err})
                }


                res.json({
                        user:newUser
                })
        })


     


        // console.log('reg body',req.body)
    

        // res.json({
        //      data:'you hit signup endpointssss'
        // })
    

}