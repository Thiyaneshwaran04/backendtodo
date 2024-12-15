const express=require("express")
const router=express.Router()
const todoSchema=require("../model/schema")


router.get("/",async(req,res)=>{
    let data= await todoSchema.find({status:"In Progress"})

    if(data!=null){
        res.status(200).json({code:200,"message":"Succesfully get data","data":data})
    }
    else{
        res.status(400).json({"code":400,"message":"No data found"})

    }
})
router.post("/",(req,res)=>{
    let data= req.body.data
    // console.log(data,"ok");
    if(data==undefined){
        res.status(400).json({"message":"internal server error",code:400})
    }
    else{
        let taskdata=new todoSchema({
            "id":data._id,
            "info":data.info,
            "time":data.time,
            "status":"In Progress"
        })
        taskdata.save()
        res.status(200).json({"message":"Succesfully Stored",code:200,"data":taskdata})

    }
})
router.get("/id/:id",(req,res)=>{
    let id=req.params.id
    todoSchema.findById(id).then((ress)=>{
        if(ress){
            res.json({"message":"succesfully get data by id",code:200,"data":ress})
        }
        else{
            res.json({"message":"no data found",code:400,})
    
        }
    }).catch(err=>{
console.log(err,"error in get");

    })
    }
)
router.put("/", (req, res) => {
    let id = req.body.id;
   
  
    todoSchema.findById(id).then((task) => {
      if (task) {
       
        task.status = "Completed";
        task.save()
          .then(updatedTask => {
            res.json({
              "message": "Successfully updated task status",
              "code": 200,
              "data": updatedTask
            });
          })
          .catch(err => {
            res.json({
              "message": "Error updating task",
              "code": 500,
              "error": err
            });
          });
      } else {
        res.json({
          "message": "No task found with that ID",
          "code": 400
        });
      }
    }).catch(err => {
      console.log(err, "Error in getting task");
      res.json({
        "message": "Error finding task",
        "code": 500,
        "error": err
      });
    });
  });
  router.get("/complete",async(req,res)=>{
    let data= await todoSchema.find({status:"Completed"})
 
      
    if(data!=null){
        res.status(200).json({code:200,"message":"Succesfully get data","data":data})
    }
    else{
        res.status(400).json({"code":400,"message":"No data found"})

    }
}
  )
  router.get("/terminate",async(req,res)=>{
    let data= await todoSchema.find({status:"Terminated"})
 
      
    if(data!=null){
        res.status(200).json({code:200,"message":"Succesfully get data","data":data})
    }
    else{
        res.status(400).json({"code":400,"message":"No data found"})

    }
}
  )
  router.put("/terminate", (req, res) => {
    let id = req.body.id;
    
    todoSchema.findById(id).then((task) => {
        if (task) {
            task.status = "Terminated";  // Update the task status to "Terminated"
            task.save()
                .then(updatedTask => {
                    res.json({
                        "message": "Successfully updated task status to Terminated",
                        "code": 200,
                        "data": updatedTask
                    });
                })
                .catch(err => {
                    res.json({
                        "message": "Error updating task",
                        "code": 500,
                        "error": err
                    });
                });
        } else {
            res.json({
                "message": "No task found with that ID",
                "code": 400
            });
        }
    }).catch(err => {
        console.log(err, "Error in getting task");
        res.json({
            "message": "Error finding task",
            "code": 500,
            "error": err
        });
    });
});
router.put("/terminate/renew",(req,res)=>{
    let taskid=req.body.id
    let uptime=req.body.time
    todoSchema.findById(taskid).then((task)=>{
        if(task){
            task.status="In Progress"
            task.time=uptime
            task.save().then(updatetask=>{
                res.json({
                    "message":"succussfully update terminate to In progress",code:200,"data":updatetask
                })
            })
         
        }
    }).catch((err)=>{
        console.log(err,"error");
        
    })
})
router.delete("/terminate/:id",(req,res)=>{
    let id=req.params.id
    todoSchema.findByIdAndDelete(id).then((resp)=>{
        res.json({"message":"sucessfully deleted ",code:200,"data":resp})
    })
})
module.exports=router