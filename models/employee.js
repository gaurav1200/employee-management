const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema ({
    name : String,
    role : String,
    mobile: Number,
    manager: String,
    office: String,
    joinigDate: Date
})

module.exports = mongoose.model('Employee',EmployeeSchema);