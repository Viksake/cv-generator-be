const fs = require("fs");
const path = require("path");
const CvQueryData = require("../models/CvQueryData");

const getTemplateHtmlById = (id) => {
  const templatePath = path.join(
    __dirname,
    "../templates",
    "template" + id + ".html"
  );

  if (!fs.existsSync(templatePath)) {
    return false;
  }

  return fs.readFileSync(templatePath, "utf8");
};

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

const getSkillLevelDots = (level) => {
  switch (level) {
    case "Začátečník":
      return 2;
    case "Pokročilý":
      return 4;
    case "Expert":
      return 5;
    default:
      return 0;
  }
};

async function saveRequestData(requestData) {
  const newCvQueryData = new CvQueryData(requestData);
  await newCvQueryData.save();
}

async function fillTemplateWithUserData(userData, html, templateId) {
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
  if (templateId == 1) {
    if (userData.photo) {
      html = html.replace(/{{photo}}/g, `${userData.photo}`);
    } else {
      html = html.replace(
        /{{photo}}/g,
        "data:image/webp;base64,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"
      );
    }
  }

  let skillsHtml = "";
  if (templateId == 1) {
    if (userData.skills && userData.skills.length > 0) {
      skillsHtml = userData.skills
        .map(
          (skill) => `
          <h4>${skill.name}</h4>
          <div class="percent">
            <div style="width: ${getSkillLevelWidth(skill.level)}%;"></div>
          </div>
      `
        )
        .join("");
    }
  } else if (templateId == 2) {
    if (userData.skills && userData.skills.length > 0) {
      skillsHtml = userData.skills
        .map(
          (skill, index) => `
      <div class="skills__item">
        <div class="left"><div class="name">${skill.name}</div></div>
        <div class="right">
          ${[...Array(5)]
            .map(
              (_, i) => `
            <input id="ck${index}-${i + 1}" type="checkbox" ${
                i < getSkillLevelDots(skill.level) ? "checked" : ""
              } />
            <label for="ck${index}-${i + 1}"></label>
          `
            )
            .join("")}
        </div>
      </div>
    `
        )
        .join("");
    }
  }

  html = html.replace(/{{#each skills}}[\s\S]*?{{\/each}}/g, skillsHtml);

  let experiencesHtml = "";
  if (templateId == 1) {
    if (userData.experiences && userData.experiences.length > 0) {
      experiencesHtml = userData.experiences
        .map(
          (skill) => `
              <div class="year_company">
                <h5>${skill.startMonth} ${skill.startYear} - ${skill.endMonth} ${skill.endYear}</h5>
                <h5>${skill.employer}</h5>
              </div>
              <div class="text">
                <h4>${skill.jobTitle}</h4>
                <p>${skill.jobDescription}</p>
              </div>
      `
        )
        .join("");
    }
  } else if (templateId == 2) {
    if (userData.experiences && userData.experiences.length > 0) {
      experiencesHtml = userData.experiences
        .map(
          (skill) => `
          <div class="section__list-item">
            <div class="left">
              <div class="name">${skill.employer}</div>
              <div class="addr">${skill.city}</div>
              <div class="duration">${skill.startMonth} ${skill.startYear} - ${skill.endMonth} ${skill.endYear}</div>
            </div>
            <div class="right">
              <div class="name">${skill.jobTitle}</div>
              <div class="desc">${skill.jobDescription}</div>
            </div>
          </div>
      `
        )
        .join("");
    }
  }
  html = html.replace(
    /{{#each experiences}}[\s\S]*?{{\/each}}/g,
    experiencesHtml
  );

  let educationHtml = "";
  if (templateId == 1) {
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
  } else if (templateId == 2) {
    if (userData.education && userData.education.length > 0) {
      educationHtml = userData.education
        .map(
          (edu) => `
          <div class="section__list-item">
            <div class="left">
              <div class="name">${edu.school}</div>
              <div class="addr">${edu.city}</div>
              <div class="duration">${edu.startMonth} ${edu.startYear} - ${edu.endMonth} ${edu.endYear}</div>
            </div>
            <div class="right">
              <div class="name">${edu.degree}</div>
            </div>
          </div>
      `
        )
        .join("");
    }
  }
  html = html.replace(/{{#each education}}[\s\S]*?{{\/each}}/g, educationHtml);

  let hobbiesHtml = "";
  if (templateId == 1) {
    if (userData.hobbies && userData.hobbies.length > 0) {
      hobbiesHtml = userData.hobbies
        .map(
          (hobby) => `
        <li>${hobby}</li>
      `
        )
        .join("");
    }
  } else if (templateId == 2) {
    if (userData.hobbies && userData.hobbies.length > 0) {
      hobbiesHtml = userData.hobbies
        .map(
          (hobby) => `
        <div class="section__list-item">${hobby}</div>
      `
        )
        .join("");
    }
  }
  html = html.replace(/{{#each hobbies}}[\s\S]*?{{\/each}}/g, hobbiesHtml);

  return html;
}

module.exports = {
  fillTemplateWithUserData,
  saveRequestData,
  getTemplateHtmlById,
};
