const express = require('express');
const app = express();
const mongoose = require('mongoose');
const homeRoute = require('./src/Routes/HomePageRoutes')


app.use(express.json());

app.use('/', homeRoute);

app.use((req, res, next)=>{
    res.status(200).json({
        messsage: 'app runs'
    })
})

//Connect to mongo
mongoose.connect('mongodb+srv://Swordsman48:Swordsman48@ashleyclone.yfprtnd.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to DataBase')
})
.catch((e)=>{
    console.log('error occured',e)
})

//Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});