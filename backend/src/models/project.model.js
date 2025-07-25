const mongoose = require("mongoose");

const generateCustomId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const projectSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: generateCustomId,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

projectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
