const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
