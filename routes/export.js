const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const { fillTemplateWithUserData } = require("../services/exportService"); // Import the service
const router = express.Router();

// Endpoint pro náhled šablony s daty uživatele
router.get("/preview/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Vyplnění šablony daty uživatele
    const html = await fillTemplateWithUserData(user);

    // Vrácení HTML přímo do prohlížeče
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).send("<h1>Error fetching user</h1>");
  }
});

// Endpoint pro stažení PDF
router.get("/download/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const html = await fillTemplateWithUserData(user);
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();
    await page.setContent(html);
    await page.waitForSelector("body");

    // Generování PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
    });

    await browser.close();

    // Nastavení hlaviček pro stažení PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="CV_${user.firstName}_${user.lastName}.pdf"`, // Přizpůsobení názvu souboru podle uživatele
    });

    res.send(pdfBuffer); // Odeslání PDF souboru
  } catch (error) {
    console.error("Chyba při generování PDF:", error);
    res.status(500).send("<h1>Chyba při generování PDF</h1>");
  }
});

module.exports = router;
