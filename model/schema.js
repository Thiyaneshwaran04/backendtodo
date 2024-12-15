const mongodb=require("mongodb")
const mongoose=require("mongoose")

const Todoschema=mongoose.Schema

let todoschema=new Todoschema({
    info:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    
}, { timestamps: true });
const Todoschemas=mongoose.model("Todo",todoschema)
module.exports=Todoschemas