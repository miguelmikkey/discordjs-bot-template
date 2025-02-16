// src/events/messageCreate.js

const { ChannelType } = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   * Handles the messageCreate event.
   * If the message is a Direct Message (DM), replies with a simple message.
   *
   * @param {Client} client - The Discord client instance.
   * @param {Message} message - The received message.
   */
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
