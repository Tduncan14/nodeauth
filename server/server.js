const express = require('express');
const auth = require('./routes/auth');


const app = express();




const PORT =  process.env.PORT || 8000


app.use(express.json())
app.use('/api',auth)



app.listen(PORT,() => {
   console.log(`Listen on ${PORT}`)



})

