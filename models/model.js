const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const oid = mongoose.Types.ObjectId;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const fileSchema = Schema({
  file_code: {
    type: Buffer,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
});

const File = mongoose.model("File", fileSchema);

const developerSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const serviceSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const projectSchema = Schema({
  project_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const testimonialSchema = Schema({
  client_name: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  stars: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const settingsSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  ref_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const UserInfo = mongoose.model("UserInfo", userSchema);
const DeveloperInfo = mongoose.model("DeveloperInfo", developerSchema);
const Service = mongoose.model("Service", serviceSchema);
const Project = mongoose.model("Project", projectSchema);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
const Settings = mongoose.model("Settings", settingsSchema);

module.exports = {
  UserInfo,
  DeveloperInfo,
  Service,
  Project,
  Testimonial,
  File,
  Settings,
};
