const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const exportRoutes = require("./routes/export.js");
const User = require("./models/User.js");

const app = express();

app.use(express.json());
app.use(cors());

// Připojení k MongoDB
mongoose
  .connect("mongodb://root:example@mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Připojeno k MongoDB"))
  .catch((err) => console.error("Chyba při připojení k MongoDB:", err));

// Definice schématu

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

// Endpoint pro ukládání dat
app.post("/api/users", async (req, res) => {
  try {
    console.log("📥 Přijatá data:", req.body);

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ message: "Data byla úspěšně uložena" });
  } catch (error) {
    console.error("Chyba při ukládání do databáze:", error);
    res.status(500).json({ error: "Chyba při ukládání dat" });
  }
});

// Endpoint pro získání dat
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
    res.status(500).json({ error: "Chyba při načítání dat" });
  }
});

// Spuštění serveru
const PORT = 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));

app.use("/api/export", exportRoutes);
