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
    },
    {
      name: "selectMenus",
      dir: "selectMenus",
      collection: client.menuHandlers,
      loaded: [],
    },
    {
      name: "modals",
      dir: "modals",
      collection: client.modalHandlers,
      loaded: [],
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
  });

  // calculate total interactions
  const totalInteractions = interactionTypes.reduce(
    (sum, type) => sum + type.loaded.length,
    0
  );

  // create consolidated log message
  console.log(
    `${colorize().green}[handlers]🔎${colorize().white} Watching ${
      colorize().brightCyan
    }${totalInteractions}${colorize().white} interactions:${colorize().reset}`
  );

  // log each interaction type
  interactionTypes.forEach((type) => {
    if (type.loaded.length > 0) {
      console.log(
        `- ${colorize().brightBlack}${type.name}: ${colorize().reset}` +
          type.loaded
            .map((id) => `${colorize().brightCyan}${id}${colorize().reset}`)
            .join(`${colorize().white}, ${colorize().reset}`)
      );
    }
  });
}

module.exports = { registerInteractions };
