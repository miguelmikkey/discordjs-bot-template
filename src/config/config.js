require("dotenv").config();
const { ActivityType } = require("discord.js");

module.exports = {
  BOT_TOKEN: process.env.DISCORD_TOKEN,
  MONGO_URI: process.env.MONGO_URI,
  DBENABLED: process.env.DATABASE_ENABLED,
  CLIENT_ID: process.env.CLIENT_ID,
  DEV_GUILD_ID: process.env.DEV_GUILD_ID,
  presence: {
    status: "dnd",
    activities: [
      {
        name: "discordjs-bot-template",
        type: ActivityType.Playing,
      },
    ],
  },
};
