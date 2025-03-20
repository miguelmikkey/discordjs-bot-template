const { colorize } = require("../assets/colors");
module.exports = {
  name: "guildDelete",
  execute: async (client, guild) => {
    try {
      // Log when the bot leaves a server
      console.log(
        `${colorize().green}[guildDelete] ${
          colorize().white
        }Bot has been removed from a server: ${colorize().brightBlue}${
          guild.name
        } | ${guild.id}${colorize().reset}`
      );

      // your code here :D
    } catch (error) {
      console.error("Error in guildDelete event:", error);
    }
  },
};
