const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const homeRouter=require('./routers/homeRouter')

const ex = express();
// db connection
mongoose.connect('mongodb+srv://mern-login:2580@cluster0.jolemll.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
});
const db=mongoose.connection;
db.on("error",()=>{
    console.log("error in connection");
})
db.once('open',()=>{
    console.log("connected");
})


const PORT = process.env.port || 8080; // will take automatically free port agar na mile to 8080 pe krdo

// parse application/x-www-form-urlencoded
ex.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
ex.use(bodyParser.json())

ex.set('view engine','ejs'); // allows us to render webpages using template files.
ex.use('/',homeRouter);

ex.listen(8000);