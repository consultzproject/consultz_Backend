const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resumeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  resume_url: {
    type: String,
    required: true,
  },
});

const resumeModal = mongoose.model("resume", resumeSchema);
module.exports = resumeModal;
