const mongoose = require("mongoose")
const schema = mongoose.Schema;


const usershema = new schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {  type: String,required: true,},
  phoneNumber: { type: String },
  address: { type: String, required: true,}, 
  dateOfJoining: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = user = mongoose.model("users", usershema)

