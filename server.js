const express=require("express")
const functions = require('firebase-functions');
const app=express()
const mongodb=require("mongodb")
const mongoose=require("mongoose")
const todoroute=require("./routes/todoroutes")
const cors=require("cors")
const bodyParser=require("body-parser")
const admin = require('firebase-admin');
admin.initializeApp();
const dbURI="mongodb+srv://thiyaneshwaran123:Thiyanu123@todo.gdeky.mongodb.net/?retryWrites=true&w=majority&appName=todo"
mongoose.connect(dbURI).then((res)=>{
    console.log("running in 2000");
    console.log("connected to db");
    app.listen(2000)

})
.catch( (err)=>{
    console.log("error in db ",err);
    
})

const allowedOrigins = ['https://todofullstack.web.app']; // Add your frontend URL here

const corsOptions = {
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow requests from allowed origins
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

// Enable CORS with options
app.use(cors(corsOptions));

app.use(express.json())
app.use(bodyParser.json());

app.use('',todoroute)
module.exports = app;
