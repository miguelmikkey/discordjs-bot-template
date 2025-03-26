const path = require("path");
const { colorize } = require("../assets/colors");

// loadFiles function from utils/loadFiles.js to load files from a directory
const { loadFiles } = require("../utils/loadFiles");

function registerCommands(client) {
  const loadedCommands = [];

  loadFiles(path.join(__dirname, "../commands"), (filePath) => {
    const command = require(filePath);
    if (command.enabled === false) return;
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      loadedCommands.push(command.data.name);
    }
  });

  // console logs for loaded commands
  // you can remove it if you want, is just to visualize the loaded commands
  console.log(
    `${colorize().green}[handlers]🔎${colorize().white} Watching commands: ${
      colorize().reset
    }` +
      loadedCommands
        .map((cmd) => `${colorize().brightCyan}${cmd}${colorize().reset}`)
        .join(`${colorize().white}, ${colorize().reset}`)
  );
}

module.exports = { registerCommands };
