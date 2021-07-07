const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Employee = require('./models/employee');
const methodOverride = require('method-override');
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

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const year = (new Date()).getFullYear();
const month = (new Date()).getMonth()
app.get('/',(req, res)=>{
res.render('home1');
})

app.get('/employees',async (req,res)=>{
    const employee = await Employee.find({});
    res.render('home',{ employee,year,month });
});
app.get('/employees/new', (req, res)=>{
    res.render('newEmployee');
});

app.post('/employees',async(req , res)=>{
    const employee = new Employee(req.body.employee);
    await employee.save();
    res.redirect('/employees');
});

app.get('/employees/:id',async(req, res)=>{
    const employee = await Employee.findById(req.params.id);
    res.render('show', { employee , year, month});
})

app.delete('/employees/:id', async(req,res)=> {
    const {id} = req.params;
    await Employee.findByIdAndDelete(id);
    res.redirect('/employees');
})

app.listen(3000,()=>{
    console.log('Serving on port 3000')
});