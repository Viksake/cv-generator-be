const fs = require("fs");
const path = require("path");

const getSkillLevelWidth = (level) => {
  switch (level) {
    case "Začátečník":
      return 33;
    case "Pokročilý":
      return 66;
    case "Expert":
      return 100;
    default:
      return 0;
  }
};

async function fillTemplateWithUserData(userData) {
  const templatePath = path.join(__dirname, "../templates", "template1.html");
  let html = fs.readFileSync(templatePath, "utf8");

  // ✅ Nahrazení základních údajů
  html = html.replace(/{{firstName}}/g, userData.firstName || "");
  html = html.replace(/{{lastName}}/g, userData.lastName || "");
  html = html.replace(/{{email}}/g, userData.email || "");
  html = html.replace(/{{phoneNumber}}/g, userData.phoneNumber || "");
  html = html.replace(/{{dateOfBirth}}/g, userData.dateOfBirth || "");
  html = html.replace(/{{street}}/g, userData.street || "");
  html = html.replace(/{{streetNumber}}/g, userData.streetNumber || "");
  html = html.replace(/{{city}}/g, userData.city || "");
  html = html.replace(/{{zipCode}}/g, userData.zipCode || "");
  html = html.replace(/{{country}}/g, userData.country || "");
  html = html.replace(/{{currentPosition}}/g, userData.currentPosition || "");
  html = html.replace(/{{bio}}/g, userData.bio || "");

  // ✅ Zpracování skills (cyklus)
  let skillsHtml = "";
  if (userData.skills && userData.skills.length > 0) {
    skillsHtml = userData.skills
      .map(
        (skill) => `
      <div class="box">
        <h4>${skill.name}</h4>
        <div class="percent">
          <div style="width: ${getSkillLevelWidth(skill.level)}%;"></div>
        </div>
      </div>
    `
      )
      .join("");
  }
  html = html.replace(/{{#each skills}}[\s\S]*?{{\/each}}/g, skillsHtml);

  // ✅ Zpracování vzdělání (cyklus)
  let educationHtml = "";
  if (userData.education && userData.education.length > 0) {
    educationHtml = userData.education
      .map(
        (edu) => `
      <li>
        <h5>${edu.startMonth} ${edu.startYear} - ${edu.endMonth} ${edu.endYear}</h5>
        <h4>${edu.degree}</h4>
        <h4>${edu.school} ${edu.city}</h4>
      </li>
    `
      )
      .join("");
  }
  html = html.replace(/{{#each education}}[\s\S]*?{{\/each}}/g, educationHtml);

  // ✅ Zpracování hobbies (cyklus)
  let hobbiesHtml = "";
  if (userData.hobbies && userData.hobbies.length > 0) {
    hobbiesHtml = userData.hobbies
      .map(
        (hobby) => `
      <li>${hobby}</li>
    `
      )
      .join("");
  }
  html = html.replace(/{{#each hobbies}}[\s\S]*?{{\/each}}/g, hobbiesHtml);

  return html;
}

module.exports = {
  fillTemplateWithUserData,
};
