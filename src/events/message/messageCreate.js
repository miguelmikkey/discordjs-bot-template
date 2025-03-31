// Check ChannelTypes: https://discord.js.org/docs/packages/discord.js/14.18.0/ChannelType:Enum
const { ChannelType } = require("discord.js");
const t = require("../../utils/translate");

module.exports = {
  name: "messageCreate",
  execute: async (client, message) => {
    const locale = "en_US";
    try {
      // Ignore messages from bots to prevent loops
      if (message.author.bot) return;

      // Check if the message was sent in a DM channel
      if (message.channel.type === ChannelType.DM) {
        await message.reply(t("messageCreate.dmResponse"));
      }
    } catch (error) {
      console.error("Error handling messageCreate event:", error);
    }
  },
};
