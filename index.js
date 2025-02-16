const path = require("path");
require("dotenv").config();
const { registerErrorHandlers } = require("./src/events/error-tracking"); // Adjust the path to the error-tracking file
const fs = require("fs");

const {
  Client,
  GatewayIntentBits,
  Collection,
  MessageFlags,
  ActivityType,
  Partials,
} = require("discord.js");

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

// Loading commands dynamically from the commands folder (You can adjust the path)
client.commands = new Collection();
const loadCommands = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      loadCommands(fullPath); // If the file is a directory, load commands from it
    } else if (file.name.endsWith(".js")) {
      const command = require(fullPath);
      if (command.data) {
        client.commands.set(command.data.name, command);
      }
    }
  }
};

loadCommands(path.join(__dirname, "/src/commands"));

client.once("ready", async () => {
  // Error tracking (Using a channel in a Discord server to track errors during production/testing)
  registerErrorHandlers(client, process.env.ERROR_TRACK_CHANNEL_ID);

  client.user.setPresence({
    activities: [{ name: "discord-bot-template", type: ActivityType.Watching }],
    status: "online",
  });

  const startInfo = [
    ` \x1b[32m\x1b[1m ✅ Your bot is online!\x1b[0m`,
    ` \x1b[36m\x1b[1m 🤖 client: \x1b[0m${client.user.username}\x1b[0m`,
  ];

  startInfo.forEach((log) => console.log(log));
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        console.warn(`⚠️ Command not found: ${interaction.commandName}`);
        return;
      }
      await command.execute(interaction);
    } else if (interaction.isButton()) {
      // Filter by the button's customId
      if (interaction.customId === "_exampleInteraction") {
        const exampleInteraction = require("./src/events/exampleInteractionHandler");
        await exampleInteraction.execute(interaction);
      }
    }
  } catch (error) {
    console.error("Error in interactionCreate:", error);
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({
        content: "There was an error processing the interaction.",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error processing the interaction.",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
