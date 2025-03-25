const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const exportRoutes = require("./routes/export.js");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://root:example@mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Připojeno k MongoDB"))
  .catch((err) => console.error("Chyba při připojení k MongoDB:", err));

// Spuštění serveru
const PORT = 5000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));

app.use("/api/export", exportRoutes);
