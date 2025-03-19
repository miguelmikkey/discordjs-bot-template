require("dotenv").config();
const { ActivityType } = require("discord.js");

module.exports = {
  BOT_TOKEN: process.env.DISCORD_TOKEN,
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
