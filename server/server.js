const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()


const auth = require('./routes/auth');


const app = express();

mongoose.connect(process.env.MONGO_URL,{
   useNewUrlParser: true})
.then(() => console.log('database connected'))
.catch((err) => console.log(err));



const PORT =  process.env.PORT || 8000


app.use(express.json())

//middleware
app.use('/api',auth)


//app middlewares

app.use(morgan('dev'));
app.use(cors()) // allows all origins


// if(process.env.NODE_ENV = 'development'){
//    app.use(cors({origin:`http://localhost:3000`}))
// }




app.listen(PORT,() => {
   console.log(`Listen on ${PORT}`)



})

