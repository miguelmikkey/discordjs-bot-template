const path = require("path");
const { colorize } = require("../assets/colors");
const fs = require("fs");

// loadFiles function from utils/loadFiles.js to load files from a directory
const { loadFiles } = require("../utils/loadFiles");

function registerEvents(client) {
  const loadedEvents = [];
  const eventsByCategory = {};

  // get the main events directory
  const eventsDir = path.join(__dirname, "../events");

  // checking if the events directory exists and if it has subdirectories
  // this is just incase events are left in the root of the events directory
  const entries = fs.readdirSync(eventsDir, { withFileTypes: true });
  const hasSubdirectories = entries.some((entry) => entry.isDirectory());

  if (hasSubdirectories) {
    // getting all directories in the events directory as categories
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        const categoryName = entry.name;
        eventsByCategory[categoryName] = [];

        // this will load all events in that specific category
        loadFiles(path.join(eventsDir, categoryName), (filePath) => {
          const event = require(filePath);
          if (event.name && typeof event.execute === "function") {
            client.on(event.name, event.execute.bind(null, client));
            loadedEvents.push(event.name);
            eventsByCategory[categoryName].push(event.name);
          }
        });
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        // this will load all events in the root of the events directory
        const filePath = path.join(eventsDir, entry.name);
        const event = require(filePath);
        if (event.name && typeof event.execute === "function") {
          client.on(event.name, event.execute.bind(null, client));
          loadedEvents.push(event.name);
          // add to 'misc' category for organization
          // if the event is in the root of the events directory
          if (!eventsByCategory["misc"]) eventsByCategory["misc"] = [];
          eventsByCategory["misc"].push(event.name);
        }
      }
    });

    // console log for loaded events
    console.log(
      `${colorize().green}[handlers]${colorize().white}🔎 Watching events: ${
        colorize().reset
      }`
    );

    // console log for events by category
    Object.keys(eventsByCategory).forEach((category) => {
      if (eventsByCategory[category].length > 0) {
        console.log(
          `- ${colorize().brightBlack}${category}: ${eventsByCategory[category]
            .map((evt) => `${colorize().brightCyan}${evt}${colorize().reset}`)
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
    // OLD CONSOLE LOG FOR LOADED EVENTS
    // IT WILL BE REMOVED IN A FUTURE UPDATE
    // console.log(
    //   `${colorize().green}[handlers]${colorize().white} Loading events: ${
    //     colorize().reset
    //   }` +
    //     loadedEvents
    //       .map((evt) => `${colorize().blue}${evt}${colorize().reset}`)
    //       .join(`${colorize().white}, ${colorize().reset}`)
    // );
  }
}

module.exports = { registerEvents };
