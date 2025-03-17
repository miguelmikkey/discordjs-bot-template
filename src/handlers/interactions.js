const path = require("path");
const { colorize } = require("../assets/colors");

// loadFiles function from utils/loadFiles.js to load files from a directory
const { loadFiles } = require("../utils/loadFiles");

function registerInteractions(client) {
  const loadedButtons = [];
  const loadedSelectMenus = [];
  const loadedModals = [];

  // button handlers
  loadFiles(path.join(__dirname, "../interactions/buttons"), (filePath) => {
    const handler = require(filePath);
    if (handler.customId && typeof handler.execute === "function") {
      client.buttonHandlers.set(handler.customId, handler);
      loadedButtons.push(handler.customId);
    }
  });

  // select menu handlers
  loadFiles(path.join(__dirname, "../interactions/selectMenus"), (filePath) => {
    const handler = require(filePath);
    if (handler.customId && typeof handler.execute === "function") {
      client.menuHandlers.set(handler.customId, handler);
      loadedSelectMenus.push(handler.customId);
    }
  });

  // modal handlers
  loadFiles(path.join(__dirname, "../interactions/modals"), (filePath) => {
    const handler = require(filePath);
    if (handler.customId && typeof handler.execute === "function") {
      client.modalHandlers.set(handler.customId, handler);
      loadedModals.push(handler.customId);
    }
  });

  // console logs for loaded interactions (buttons, select menus, modals)
  // you can remove them if you want, is just to visualize the loaded interactions
  console.log(
    `${colorize().green}[handlers]${colorize().white} Loading buttons: ${
      colorize().reset
    }` +
      loadedButtons
        .map((btn) => `${colorize().brightCyan}${btn}${colorize().reset}`)
        .join(`${colorize().white}, ${colorize().reset}`)
  );

  console.log(
    `${colorize().green}[handlers]${colorize().white} Loading selectMenus: ${
      colorize().reset
    }` +
      loadedSelectMenus
        .map((menu) => `${colorize().blue}${menu}${colorize().reset}`)
        .join(`${colorize().white}, ${colorize().reset}`)
  );

  console.log(
    `${colorize().green}[handlers]${colorize().white} Loading modals: ${
      colorize().reset
    }` +
      loadedModals
        .map((modal) => `${colorize().brightCyan}${modal}${colorize().reset}`)
        .join(`${colorize().white}, ${colorize().reset}`)
  );
}

module.exports = { registerInteractions };
