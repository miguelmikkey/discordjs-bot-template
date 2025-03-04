const path = require("path");
require("dotenv").config();
const fs = require("fs");
// Translation function
const t = require("./src/utils/translate");

const {
  Client,
  GatewayIntentBits,
  Collection,
  MessageFlags,
  ActivityType,
  Partials,
  Locale,
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

// Initialize collections for commands and interactions
client.commands = new Collection();
client.buttonHandlers = new Collection();
client.menuHandlers = new Collection();
client.modalHandlers = new Collection();

/**
 * Dynamically loads commands from the specified folder.
 *
 * @param {string} dir - The directory to load commands from.
 */
const loadCommands = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadCommands(fullPath);
    } else if (file.name.endsWith(".js")) {
      const command = require(fullPath);
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      }
    }
  }
};

loadCommands(path.join(__dirname, "src/commands"));

/**
 * Dynamically loads events from the specified folder.
 *
 * @param {string} dir - The directory to load events from.
 */
const loadEvents = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadEvents(fullPath);
    } else if (file.name.endsWith(".js")) {
      const event = require(fullPath);
      if (event.name && typeof event.execute === "function") {
        // Pass the client as the first argument for each event
        client.on(event.name, event.execute.bind(null, client));
      }
    }
  }
};

loadEvents(path.join(__dirname, "src/events"));

/**
 * Dynamically loads button interaction handlers.
 *
 * @param {string} dir - The directory to load button handlers from.
 */
const loadButtonHandlers = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadButtonHandlers(fullPath);
    } else if (file.name.endsWith(".js")) {
      const handler = require(fullPath);
      if (handler.customId && typeof handler.execute === "function") {
        client.buttonHandlers.set(handler.customId, handler);
      }
    }
  }
};

loadButtonHandlers(path.join(__dirname, "src/interactions/buttons"));

/**
 * Dynamically loads select menu interaction handlers.
 *
 * @param {string} dir - The directory to load select menu handlers from.
 */
const loadMenuHandlers = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadMenuHandlers(fullPath);
    } else if (file.name.endsWith(".js")) {
      const handler = require(fullPath);
      if (handler.customId && typeof handler.execute === "function") {
        client.menuHandlers.set(handler.customId, handler);
      }
    }
  }
};

loadMenuHandlers(path.join(__dirname, "src/interactions/selectMenus"));

/**
 * Dynamically loads modal interaction handlers.
 *
 * @param {string} dir - The directory to load modal handlers from.
 */
const loadModalHandlers = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadModalHandlers(fullPath);
    } else if (file.name.endsWith(".js")) {
      const handler = require(fullPath);
      if (handler.customId && typeof handler.execute === "function") {
        client.modalHandlers.set(handler.customId, handler);
      }
    }
  }
};

loadModalHandlers(path.join(__dirname, "src/interactions/modals"));

/**
 * "ready" event: runs when the client is fully ready.
 */
client.once("ready", async () => {
  try {
    console.log(`✅ Bot connected as: ${client.user.tag}`);

    // Register slash commands with Discord
    const commandsData = client.commands.map((command) =>
      command.data.toJSON()
    );
    if (process.env.DEV_GUILD_ID) {
      const guild = client.guilds.cache.get(process.env.GUILD_ID);
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
      status: "dnd",
    });

    console.log("✅ Bot is ready.");
  } catch (error) {
    console.error("Error during client initialization:", error);
  }
});

// Global error handling
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

// Log in to Discord using the token from .env
client.login(process.env.DISCORD_TOKEN);
