const express = require("express");
const puppeteer = require("puppeteer");
const exportService = require("../services/exportService"); // Import the service
const router = express.Router();

router.post("/download/:id", async (req, res) => {
  const templateId = req.params.id;
  const templateHtml = exportService.getTemplateHtmlById(templateId);
  if (templateHtml === false) {
    res.status(404).json({
      error: "Template with ID " + templateId + " was not found",
    });
    return;
  }

  const userData = req.body;
  exportService.saveRequestData({
    requestedAt: new Date(),
    userAgent: req.headers["user-agent"],
    templateId: templateId,
    ...userData,
  });

  try {
    const html = await exportService.fillTemplateWithUserData(
      userData,
      templateHtml
    );

    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });

    const page = await browser.newPage();
    await page.setContent(html);
    await page.waitForSelector("body");

    // Generování PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
    res.setHeader("Content-Length", pdfBuffer.length);
    res.end(pdfBuffer);
  } catch (error) {
    console.error("Chyba při generování PDF:", error);
    res.status(500).send("<h1>Chyba při generování PDF</h1>");
    return;
  }
});

module.exports = router;
