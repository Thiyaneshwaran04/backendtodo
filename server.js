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

// Firebase authentication middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Authentication required' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Invalid or expired token' });
  }
};

// Apply authMiddleware on all routes or specific ones
app.use(authMiddleware);

app.use(express.json())
app.use(bodyParser.json());

app.use('',todoroute)
module.exports = app;
