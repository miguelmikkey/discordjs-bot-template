const { colorize } = require("../../assets/colors");
module.exports = {
  name: "guildCreate",
  execute: async (client, guild) => {
    try {
      // Log when the bot joins a new server
      console.log(
        `${colorize().green}[guildCreate] ${
          colorize().white
        }Bot has joined a new server: ${colorize().brightBlue}${guild.name} | ${
          guild.id
        }${colorize().reset}`
      );

      // your code here :D
    } catch (error) {
      console.error("Error in guildCreate event:", error);
    }
  },
};
