const mongoose = require("mongoose");

const cvQueryData = new mongoose.Schema({
  templateId: Number,
  requestedAt: Date,
  userAgent: String,
  // User supplied data
  firstName: String,
  lastName: String,
  email: String,
  photo: String,
  phoneNumber: String,
  street: String,
  streetNumber: String,
  city: String,
  zipCode: String,
  country: String,
  bio: String,
  experiences: [
    {
      jobTitle: String,
      city: String,
      employer: String,
      startMonth: String,
      startYear: String,
      endMonth: String,
      endYear: String,
      jobDescription: String,
    },
  ],
  education: [
    {
      degree: String,
      city: String,
      school: String,
      startMonth: String,
      startYear: String,
      endMonth: String,
      endYear: String,
    },
  ],
  hobbies: [String],
  skills: [
    {
      name: String,
      level: String,
    },
  ],
});

module.exports = mongoose.model("CvQueryData", cvQueryData);
