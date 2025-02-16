const { REST, Routes } = require("discord.js");
const { readdirSync, statSync } = require("fs");
const path = require("path");
const config = require("./src/config/config");

const commands = [];
const commandsPath = path.join(__dirname, "src", "commands");

// Función para leer archivos dentro de subcarpetas
const getCommandFiles = (dir) => {
  const files = [];
  for (const file of readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getCommandFiles(fullPath));
    } else if (file.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
};

const commandFiles = getCommandFiles(commandsPath);

for (const file of commandFiles) {
  const command = require(file);
  if (command.data) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

(async () => {
  try {
    console.log(`🔁 Deploying commands: ${commands.length} `);
    await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
      body: commands,
    });
    console.log("✅ Commands deployed!");
  } catch (error) {
    console.error("❌ Error deploying commands:", error);
  }
})();
