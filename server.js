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
app.use(cors({
    origin: "https://todofullstack.web.app/", // Allow only your frontend
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));

app.use(express.json())
app.use(bodyParser.json());

app.use('',todoroute)
module.exports = app;
