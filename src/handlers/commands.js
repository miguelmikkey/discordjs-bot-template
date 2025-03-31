const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");
const { colorize } = require("../assets/colors");

// loadFiles function from utils/loadFiles.js to load files from a directory
const { loadFiles } = require("../utils/loadFiles");

function registerCommands(client) {
  const loadedCommands = [];

  // Create a collection for categories
  client.commandCategories = new Collection();

  const commandsDir = path.join(__dirname, "../commands");

  // First check if there are category directories
  const items = fs.readdirSync(commandsDir);
  const hasCategories = items.some((item) =>
    fs.statSync(path.join(commandsDir, item)).isDirectory()
  );

  if (hasCategories) {
    // Process commands with categories
    const categories = items.filter((item) =>
      fs.statSync(path.join(commandsDir, item)).isDirectory()
    );

    for (const category of categories) {
      // Initialize this category in the collection
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      client.commandCategories.set(category, {
        name: categoryName,
        commands: [],
      });

      // Load commands from this category
      loadFiles(path.join(commandsDir, category), (filePath) => {
        const command = require(filePath);
        if (command.enabled === false) return;

        if (command.data && command.execute) {
          // Store command in main collection
          client.commands.set(command.data.name, command);

          // Store command name in its category
          client.commandCategories
            .get(category)
            .commands.push(command.data.name);

          // Add command name to the loaded list with category info
          loadedCommands.push({
            name: command.data.name,
            category: categoryName,
          });
        }
      });
    }

    // Display commands grouped by category
    console.log(
      `${colorize().green}[handlers]🔎${colorize().white} Watching commands:${
        colorize().reset
      }`
    );

    for (const categoryData of client.commandCategories.values()) {
      if (categoryData.commands.length > 0) {
        console.log(
          `- ${colorize().brightBlack}${categoryData.name}:${
            colorize().reset
          } ` +
            categoryData.commands
              .map((cmd) => `${colorize().brightCyan}${cmd}${colorize().reset}`)
              .join(`${colorize().white}, ${colorize().reset}`)
        );
      }
    }
  } else {
    // Fallback to the original flat structure for backwards compatibility
    loadFiles(commandsDir, (filePath) => {
      const command = require(filePath);
      if (command.enabled === false) return;

      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        loadedCommands.push({ name: command.data.name, category: "General" });
      }
    });

    // The original console log for backward compatibility
    console.log(
      `${colorize().green}[handlers]🔎${colorize().white} Watching commands: ${
        colorize().reset
      }` +
        loadedCommands
          .map(
            (cmd) => `${colorize().brightCyan}${cmd.name}${colorize().reset}`
          )
          .join(`${colorize().white}, ${colorize().reset}`)
    );
  }
}

module.exports = { registerCommands };
