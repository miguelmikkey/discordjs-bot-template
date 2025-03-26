// Check ChannelTypes: https://discord.js.org/docs/packages/discord.js/14.18.0/ChannelType:Enum
const { ChannelType } = require("discord.js");

module.exports = {
  name: "messageCreate",
  execute: async (client, message) => {
    try {
      // Ignore messages from bots to prevent loops
      if (message.author.bot) return;

      // Check if the message was sent in a DM channel
      if (message.channel.type === ChannelType.DM) {
        await message.reply("Hello, this is a private message.");
      }
    } catch (error) {
      console.error("Error handling messageCreate event:", error);
    }
  },
};
