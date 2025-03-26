const path = require("path");
const { colorize } = require("../assets/colors");
const fs = require("fs");

// loadFiles function from utils/loadFiles.js to load files from a directory
const { loadFiles } = require("../utils/loadFiles");

function registerEvents(client) {
  const loadedEvents = [];
  const eventsByCategory = {};

  // Get the base events directory
  const eventsDir = path.join(__dirname, "../events");

  // Check if we need to process subdirectories or just the base directory
  const entries = fs.readdirSync(eventsDir, { withFileTypes: true });
  const hasSubdirectories = entries.some((entry) => entry.isDirectory());

  if (hasSubdirectories) {
    // Process directories as categories
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        const categoryName = entry.name;
        eventsByCategory[categoryName] = [];

        // Load files from this category directory
        loadFiles(path.join(eventsDir, categoryName), (filePath) => {
          const event = require(filePath);
          if (event.name && typeof event.execute === "function") {
            client.on(event.name, event.execute.bind(null, client));
            loadedEvents.push(event.name);
            eventsByCategory[categoryName].push(event.name);
          }
        });
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        // Handle root-level event files too
        const filePath = path.join(eventsDir, entry.name);
        const event = require(filePath);
        if (event.name && typeof event.execute === "function") {
          client.on(event.name, event.execute.bind(null, client));
          loadedEvents.push(event.name);
          // Add to 'misc' category for organization
          if (!eventsByCategory["misc"]) eventsByCategory["misc"] = [];
          eventsByCategory["misc"].push(event.name);
        }
      }
    });

    Object.keys(eventsByCategory).forEach((category) => {
      if (eventsByCategory[category].length > 0) {
        console.log(
          `${colorize().green}[handlers]🔎${
            colorize().white
          } Watching ${category} events: ${eventsByCategory[category]
            .map(
              (evt) => `${colorize().brightMagenta}${evt}${colorize().reset}`
            )
            .join(`${colorize().white}, ${colorize().reset}`)}`
        );
      }
    });
  } else {
    // THIS IS THE OLD WAY OF LOADING EVENTS (WITHOUT CATEGORIES)
    // IT WILL BE REMOVED IN A FUTURE UPDATE

    // loadFiles(eventsDir, (filePath) => {
    //   const event = require(filePath);
    //   if (event.name && typeof event.execute === "function") {
    //     client.on(event.name, event.execute.bind(null, client));
    //     loadedEvents.push(event.name);
    //   }
    // });

    // Original console log format
    console.log(
      `${colorize().green}[handlers]${colorize().white} Loading events: ${
        colorize().reset
      }` +
        loadedEvents
          .map((evt) => `${colorize().blue}${evt}${colorize().reset}`)
          .join(`${colorize().white}, ${colorize().reset}`)
    );
  }
}

module.exports = { registerEvents };
