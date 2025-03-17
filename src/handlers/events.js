const path = require("path");
const { colorize } = require("../assets/colors");

// loadFiles function from utils/loadFiles.js to load files from a directory
const { loadFiles } = require("../utils/loadFiles");

function registerEvents(client) {
  const loadedEvents = [];

  loadFiles(path.join(__dirname, "../events"), (filePath) => {
    const event = require(filePath);
    if (event.name && typeof event.execute === "function") {
      client.on(event.name, event.execute.bind(null, client));
      loadedEvents.push(event.name);
    }
  });

  // console logs for loaded events
  // you can remove it if you want, is just to visualize the loaded events
  console.log(
    `${colorize().green}[handlers]${colorize().white} Loading events: ${
      colorize().reset
    }` +
      loadedEvents
        .map((evt) => `${colorize().blue}${evt}${colorize().reset}`)
        .join(`${colorize().white}, ${colorize().reset}`)
  );
}

module.exports = { registerEvents };
