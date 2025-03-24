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
});

// initialize collections for commands, buttonHandlers, menuHandlers, and modalHandlers
client.commands = new Collection();
client.buttonHandlers = new Collection();
client.menuHandlers = new Collection();
client.modalHandlers = new Collection();

// load handlers from src/handlers/index.js (commands, events, interactions, etc.)
initHandlers(client);

client.once("ready", async () => {
  try {
    // just some random console logs :)
    console.log(
      `${colorize().green}[app] ${colorize().white}Client connected:${
        colorize().blue
      } ${client.user.tag}${colorize().reset}`
    );

    // initialize the database connection
    client.database = await initDatabase();

    // another one...
    console.log(
      `${colorize().yellow}[app] ${
        colorize().white
      }Registering slash commands...${colorize().reset}`
    );
    // Register slash commands on the client (/src/handlers/registerCommands.js)
    await registerSlashCommands(client);

    // Set the bot's presence from the config file
    client.user.setPresence(config.presence);

    // and another one...
    console.log(
      `${colorize().green}[app] ${colorize().white}Bot is ready!${
        colorize().reset
      }`
    );
  } catch (error) {
    console.error(
      `${colorize().red}[error] Error during bot start${colorize().reset}`,
      error
    );
  }
});

// Global error handlers (src/utils/{discordErrorCodes.js, errorHandlers.js})
process.on("unhandledRejection", async (error) => {
  if (
    error &&
    error.code &&
    Object.keys(require("./src/utils/discordErrorCodes").ERROR_CODES).includes(
      error.code.toString()
    )
  ) {
    console.log(
      `${colorize().yellow}[process] ${
        colorize().white
      }Unhandled Discord API error${colorize().reset}`
    );

    const {
      getDiscordErrorMessage,
      getErrorCategory,
    } = require("./src/utils/discordErrorCodes");
    console.log(
      `${colorize().red}[discord:${getErrorCategory(error.code)}] ${
        colorize().white
      }${getDiscordErrorMessage(error.code)}${colorize().reset}`
    );
  } else {
    console.log(
      `${colorize().red}[error] An unhandled rejection was found:${
        colorize().reset
      }`
    );
    console.error(error);
  }
});

process.on("uncaughtException", async (error) => {
  if (
    error &&
    error.code &&
    Object.keys(require("./src/utils/discordErrorCodes").ERROR_CODES).includes(
      error.code.toString()
    )
  ) {
    console.log(
      `${colorize().yellow}[process] ${
        colorize().white
      }Unhandled Discord API error${colorize().reset}`
    );
    const {
      getDiscordErrorMessage,
      getErrorCategory,
    } = require("./src/utils/discordErrorCodes");
    console.log(
      `${colorize().red}[discord:${getErrorCategory(error.code)}] ${
        colorize().white
      }${getDiscordErrorMessage(error.code)}${colorize().reset}`
    );
  } else {
    console.log(
      `${colorize().red}[error] An Uncaught exception was found:${
        colorize().reset
      }`
    );
    console.error("Uncaught exception:", error);
  }
});

client.login(process.env.DISCORD_TOKEN);
