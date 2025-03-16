// Module to work with file and directory paths
const path = require("path");

// Load environment variables from .env file
require("dotenv").config();

// File system module for reading files
const fs = require("fs");

// (UTILS) Load the translation module from the utils folder
const t = require("./src/utils/translate");

// (UTILS)
const { loadFiles } = require("./src/utils/loadFiles");

// Loading required classes and constants from discord.js
const {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
  Partials,
} = require("discord.js");

// Import the error handlers module
const { registerErrorHandlers } = require("./src/events/error-tracking");

// Create a new Discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

// Initialize collections for commands and interactions (buttons, select menus, modals)
client.commands = new Collection();
client.buttonHandlers = new Collection();
client.menuHandlers = new Collection();
client.modalHandlers = new Collection();

// Loading commands from the commands folder
loadFiles(path.join(__dirname, "src/commands"), (filePath) => {
  const command = require(filePath);

  // Skip disabled commands
  if (command.enabled === false) return;

  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
  }
});

// Loading events from the events folder
loadFiles(path.join(__dirname, "src/events"), (filePath) => {
  const event = require(filePath);
  if (event.name && typeof event.execute === "function") {
    client.on(event.name, event.execute.bind(null, client));
  }
});

// Loading button handlers from the interactions/buttons folder
loadFiles(path.join(__dirname, "src/interactions/buttons"), (filePath) => {
  const handler = require(filePath);
  if (handler.customId && typeof handler.execute === "function") {
    client.buttonHandlers.set(handler.customId, handler);
  }
});

// Loading select menu handlers from the interactions/selectMenus folder
loadFiles(path.join(__dirname, "src/interactions/selectMenus"), (filePath) => {
  const handler = require(filePath);
  if (handler.customId && typeof handler.execute === "function") {
    client.menuHandlers.set(handler.customId, handler);
  }
});

// Loading modal handlers from the interactions/modals folder
loadFiles(path.join(__dirname, "src/interactions/modals"), (filePath) => {
  const handler = require(filePath);
  if (handler.customId && typeof handler.execute === "function") {
    client.modalHandlers.set(handler.customId, handler);
  }
});

// Event listener for when the bot is ready
client.once("ready", async () => {
  try {
    console.log(`✅ Bot connected as: ${client.user.tag}`);

    // Register slash commands with Discord
    const commandsData = client.commands.map((command) =>
      command.data.toJSON()
    );
    // If the bot is in a development guild, register commands there instead of globally (for testing)
    if (process.env.DEV_GUILD_ID) {
      const guild = client.guilds.cache.get(process.env.DEV_GUILD_ID);
      if (!guild) {
        console.warn(
          "Development guild not found. Make sure the bot is in the guild specified by DEV_GUILD_ID."
        );
      } else {
        await guild.commands.set(commandsData);
        console.log("✅ Slash commands registered in the development guild.");
      }
    } else {
      await client.application.commands.set(commandsData);
      console.log("✅ Slash commands registered globally.");
    }

    // Register error handlers once the client is ready
    registerErrorHandlers(client, process.env.ERROR_HANDLER_CHANNEL_ID);

    // Set the bot's presence
    client.user.setPresence({
      activities: [
        { name: "discord-bot-template", type: ActivityType.Playing },
      ],
      status: "dnd", // online, idle, dnd, invisible
    });

    console.log("✅ Bot is ready.");
  } catch (error) {
    console.error("Error during client initialization:", error);
  }
});

// (ErrorHandler on Discord guild) <== Check GUIDE.md for more information
// Log unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

// (ErrorHandler on Discord guild) <== Check GUIDE.md for more information
// Log uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

// Log in to Discord using the token from .env
client.login(process.env.DISCORD_TOKEN);
