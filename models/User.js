const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  dateOfBirth: String,
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
      schoolDescription: String,
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

module.exports = mongoose.model("User", userSchema);
