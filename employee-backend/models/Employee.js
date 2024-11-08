const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  image: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: String,
  designation: String,
  gender: String,
  course: String,
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);
