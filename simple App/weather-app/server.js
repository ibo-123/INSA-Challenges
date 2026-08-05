const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();


app.use(cors());
app.use(express.json());



const FILE = "./task.json";



// READ DATABASE

function readTasks(){

    const data = fs.readFileSync(FILE);

    return JSON.parse(data);

}



// WRITE DATABASE

function writeTasks(tasks){

    fs.writeFileSync(
        FILE,
        JSON.stringify(tasks,null,2)
    );

}



// GET ALL TASKS

app.get("/api/tasks",(req,res)=>{


    const tasks = readTasks();


    res.json(tasks);


});




// CREATE TASK

app.post("/api/tasks",(req,res)=>{


    const tasks = readTasks();
    let newId = 1;
        if (tasks.length > 0){
                newId = tasks[tasks.length - 1].id + 1;
        }
    const newTask = {

        id:newId,

        title:req.body.title,

        completed:false

    };


    tasks.push(newTask);


    writeTasks(tasks);


    res.json(newTask);


});




// DELETE TASK

app.delete("/api/tasks/:id",(req,res)=>{


    let tasks = readTasks();


    tasks = tasks.filter(

        task => task.id != req.params.id

    );


    writeTasks(tasks);


    res.json({
        message:"Task deleted"
    });


});




app.listen(5000,()=>{

    console.log(
        "Server running on port 5000"
    );

});