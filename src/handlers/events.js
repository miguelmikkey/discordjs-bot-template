const path = require("path");
const { colorize } = require("../assets/colors");
const fs = require("fs");
const { loadFiles } = require("../utils/loadFiles");

function registerEvents(client) {
  // get the main events directory
  const eventsDir = path.join(__dirname, "../events");
  const eventsByCategory = {};
  let totalEventsLoaded = 0;

  // check if events directory exists
  if (!fs.existsSync(eventsDir)) {
    console.warn(
      `${colorize().yellow}[warning]⚠️ ${
        colorize().white
      }Events directory not found!${colorize().reset}`
    );
    return;
  }

  try {
    // read all entries in the events directory
    const entries = fs.readdirSync(eventsDir, { withFileTypes: true });

    // process directories (categories)
    entries
      .filter((entry) => entry.isDirectory())
      .forEach((dir) => {
        const categoryName = dir.name;
        eventsByCategory[categoryName] = [];

        // load event files from this category
        loadFiles(path.join(eventsDir, categoryName), (filePath) => {
          try {
            const event = require(filePath);

            // validate event structure
            if (!event.name || typeof event.execute !== "function") {
              console.warn(
                `${colorize().yellow}[warning]⚠️ ${
                  colorize().white
                }Invalid event file: ${filePath}${colorize().reset}`
              );
              return;
            }

            // register the event
            client.on(event.name, (...args) => event.execute(client, ...args));
            eventsByCategory[categoryName].push(event.name);
            totalEventsLoaded++;
          } catch (error) {
            console.error(
              `${colorize().red}[error]❌ ${
                colorize().white
              }Failed to load event: ${filePath}${colorize().reset}`
            );
            console.error(error);
          }
        });
      });

    // process root files (if any)
    const rootFiles = entries.filter(
      (entry) => entry.isFile() && entry.name.endsWith(".js")
    );
    if (rootFiles.length > 0) {
      const rootCategory = "root";
      eventsByCategory[rootCategory] = [];

      rootFiles.forEach((file) => {
        const filePath = path.join(eventsDir, file.name);
        try {
          const event = require(filePath);

          // validate event structure
          if (!event.name || typeof event.execute !== "function") {
            console.warn(
              `${colorize().yellow}[warning]⚠️ ${
                colorize().white
              }Invalid event file: ${filePath}${colorize().reset}`
            );
            return;
          }

          // register the event
          client.on(event.name, (...args) => event.execute(client, ...args));
          eventsByCategory[rootCategory].push(event.name);
          totalEventsLoaded++;
        } catch (error) {
          console.error(
            `${colorize().red}[error]❌ ${
              colorize().white
            }Failed to load event: ${filePath}${colorize().reset}`
          );
          console.error(error);
        }
      });
    }

    // log results
    if (totalEventsLoaded > 0) {
      console.log(
        `${colorize().green}[handlers]🔎${colorize().white} Watching ${
          colorize().brightCyan
        }${totalEventsLoaded}${colorize().white} events:${colorize().reset}`
      );

      // log events by category
      Object.keys(eventsByCategory).forEach((category) => {
        if (eventsByCategory[category].length > 0) {
          console.log(
            `- ${colorize().brightBlack}${category}: ${
              colorize().reset
            }${eventsByCategory[category]
              .map((evt) => `${colorize().brightCyan}${evt}${colorize().reset}`)
              .join(`${colorize().white}, ${colorize().reset}`)}`
          );
        }
      });
    } else {
      console.warn(
        `${colorize().yellow}[warning]⚠️ ${
          colorize().white
        }No event files were loaded${colorize().reset}`
      );
    }
  } catch (error) {
    console.error(
      `${colorize().red}[error]❌ ${colorize().white}Failed to register events${
        colorize().reset
      }`
    );
    console.error(error);
  }
}

module.exports = { registerEvents };
