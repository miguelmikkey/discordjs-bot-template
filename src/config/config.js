require("dotenv").config();
const { ActivityType } = require("discord.js");

module.exports = {
  GUILD_ID: process.env.GUILD_ID,
  BOT_TOKEN: process.env.DISCORD_TOKEN,
  presence: {
    status: "dnd",
    activities: [
      {
        name: "discord-bot-template",
        type: ActivityType.Playing,
      },
    ],
  },
};
