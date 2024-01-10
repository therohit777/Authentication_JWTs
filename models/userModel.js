const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, default: null},
  email: { type: String, default: null},
  password: { type: String, default: null},
});

module.exports = mongoose.model("Customer", customerSchema);