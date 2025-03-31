const path = require("path");
const { colorize } = require("../assets/colors");
const { loadFiles } = require("../utils/loadFiles");

function registerInteractions(client) {
  // define interaction types
  const interactionTypes = [
    {
      name: "buttons",
      dir: "buttons",
      collection: client.buttonHandlers,
      loaded: [],
      color: "brightCyan",
    },
    {
      name: "selectMenus",
      dir: "selectMenus",
      collection: client.menuHandlers,
      loaded: [],
      color: "blue",
    },
    {
      name: "modals",
      dir: "modals",
      collection: client.modalHandlers,
      loaded: [],
      color: "brightCyan",
    },
  ];

  // loading files from the interactions directory
  interactionTypes.forEach((type) => {
    loadFiles(
      path.join(__dirname, `../interactions/${type.dir}`),
      (filePath) => {
        const handler = require(filePath);
        if (handler.customId && typeof handler.execute === "function") {
          type.collection.set(handler.customId, handler);
          type.loaded.push(handler.customId);
        }
      }
    );

    // logging loaded interactions
    console.log(
      `${colorize().green}[handlers]🔎${colorize().white} Watching ${
        type.name
      }: ${colorize().reset}` +
        type.loaded
          .map((id) => `${colorize()[type.color]}${id}${colorize().reset}`)
          .join(`${colorize().white}, ${colorize().reset}`)
    );
  });
}

module.exports = { registerInteractions };
