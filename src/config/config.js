require("dotenv").config();
const { ActivityType } = require("discord.js");

module.exports = {
  BOT_TOKEN: process.env.DISCORD_TOKEN,
  MONGO_URI: process.env.MONGO_URI,
  DBENABLED: process.DATABASE_ENABLED,
  CLIENT_ID: process.env.CLIENT_ID,
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
