// dotenv is a package that allows you to load environment variables from a .env file into process.env
require("dotenv").config();

// import colorize from src/assets/colors.js (for console.log colors)
const { colorize } = require("./src/assets/colors");

const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
} = require("discord.js");

// import initHandlers from src/handlers/index.js
const { initHandlers } = require("./src/handlers");

// import registerSlashCommands from src/handlers/registerCommands.js
const { registerSlashCommands } = require("./src/handlers/registerCommands");

// import MongoDB connection from src/database/mongoose.js
const { initDatabase } = require("./src/database/mongoose");

// config file
const config = require("./src/config/config");

const client = new Client({
  intents: [
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
    Partials.ThreadMember,
  ],
  shards: "auto", // Tell the client to respect the sharding manager's settings
});

global.client = client;

// initialize collections for commands, buttonHandlers, menuHandlers, and modalHandlers
client.commands = new Collection();
client.buttonHandlers = new Collection();
client.menuHandlers = new Collection();
client.modalHandlers = new Collection();

// load handlers from src/handlers/index.js (commands, events, interactions, etc.)
initHandlers(client);

client.once("ready", async () => {
  try {
    // Add shard information to the log
    const shardId = client.shard ? client.shard.ids[0] : "Unsharded";
    console.log(
      `${colorize().green}[app] ${
        colorize().white
      }Shard #${shardId} connected:${colorize().blue} ${client.user.tag}${
        colorize().reset
      }`
    );

    // initialize the database connection
    client.database = await initDatabase();

    // Only register slash commands from one shard (shard 0) to avoid rate limits
    if (!client.shard || client.shard.ids.includes(0)) {
      console.log(
        `${colorize().yellow}[app] ${
          colorize().white
        }Registering slash commands from shard #${shardId}...${
          colorize().reset
        }`
      );
      // Register slash commands on the client (/src/handlers/registerCommands.js)
      await registerSlashCommands(client);
    }

    // Set the bot's presence from the config file
    client.user.setPresence(config.presence);

    // Log that this shard is ready
    console.log(
      `${colorize().green}[app] ${colorize().white}Shard ${
        colorize().brightBlue
      }#${shardId}${colorize().white} is ready!${colorize().reset}`
    );

    // Get total server count across all shards
    if (client.shard) {
      try {
        const guildCounts = await client.shard.fetchClientValues(
          "guilds.cache.size"
        );
        const totalGuildCount = guildCounts.reduce(
          (acc, count) => acc + count,
          0
        );
        console.log(
          `${colorize().blue}[stats] ${colorize().white}Bot is in ${
            colorize().yellow
          }${totalGuildCount}${colorize().white} servers across all shards${
            colorize().reset
          }`
        );
      } catch (e) {
        console.error("Error fetching guild counts:", e);
      }
    }
  } catch (error) {
    console.error(
      `${colorize().red}[error] Error during shard start${colorize().reset}`,
      error
    );
  }
});

// Global error handlers
process.on("unhandledRejection", (error) => {
  const shardId = client.shard ? client.shard.ids[0] : "Unsharded";
  console.log(
    `${colorize().red}[error] ${
      colorize().white
    }Shard #${shardId}: An unhandled rejection was found:${colorize().reset}`
  );
  console.error(error);
});

process.on("uncaughtException", (error) => {
  const shardId = client.shard ? client.shard.ids[0] : "Unsharded";
  console.log(
    `${colorize().red}[error] ${
      colorize().white
    }Shard #${shardId}: An Uncaught exception was found:${colorize().reset}`
  );
  console.error("Uncaught exception:", error);
});

client.login(process.env.DISCORD_TOKEN);
