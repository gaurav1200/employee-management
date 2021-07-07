const mongoose = require('mongoose');
const Employee = require('../models/employee');

mongoose.connect('mongodb://localhost:27017/employee-management', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", () =>{
    console.log("Database connected");
});

const seedDB = async ()=> {
const Emp= new Employee(
    {
    name : 'Ravi Kumar',
    role : "Senior Software Dev",
    mobile: +91-1234567890,
    manager: "Rahul Mahant",
    Office: 'Bangalore',
    joiningDate: ""
    })
Emp.save();
}

seedDB().then(()=>{
    mongoose.connection.close();
})