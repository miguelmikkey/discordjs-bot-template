const fs = require("fs");
const path = require("path");

// This function gets the translation file for a specific locale(Guild preffered language)
function loadLocale(locale) {
  try {
    locale = locale.replace("-", "_");
    const filePath = path.join(__dirname, `../../locales/${locale}.json`);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  } catch (error) {
    // If the locale file does not exist, return the default locale file (en_US.json)
    const filePath = path.join(__dirname, `../../locales/en_US.json`);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  }
}

// This function gets the translation for a specific key in a specific locale
function t(locale, key, params = {}) {
  const dict = loadLocale(locale);
  const keys = key.split(".");
  let text = dict;
  for (const k of keys) {
    if (text && Object.prototype.hasOwnProperty.call(text, k)) {
      text = text[k];
    } else {
      text = null;
      break;
    }
  }
  if (!text) {
    text = key; // fallback to key if translation is not found
  }
  // Replace all parameters in the text with the values provided
  for (const [paramKey, paramValue] of Object.entries(params)) {
    // Replace all occurrences of the parameter in the text
    text = text.replace(new RegExp(`{${paramKey}}`, "g"), paramValue);
  }
  return text;
}

module.exports = t;
