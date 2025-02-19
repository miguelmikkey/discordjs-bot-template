const { EmbedBuilder } = require("discord.js");
const path = require("path");
require("dotenv").config();

const registerErrorHandlers = (client, errorChannelID) => {
  process.on("uncaughtException", async (err) => {
    try {
      const channel = await client.channels.fetch(errorChannelID);
      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("uncaughtException!")
          .addFields({
            name: "Client",
            value: `<@${client.user?.id}>` || "unavailable",
          })
          .setDescription(
            `\`\`\`
Error: ${err.message}
Stack Trace:
${err.stack}
\`\`\``
          )
          .setTimestamp();

        await channel.send({
          content: `<@&${process.env.ERROR_HANDLER_MENTION_ID}>!`,
          embeds: [embed],
        });
      } else {
        console.error("The channel with the provided ID was not found.");
      }
    } catch (error) {
      console.error("Error sending the message to the channel", error);
    }
    // Timeout to allow the message to be sent before the process exits
    setTimeout(() => process.exit(1), 1000);
  });

  process.on("unhandledRejection", async (reason, promise) => {
    try {
      const channel = await client.channels.fetch(errorChannelID);
      if (channel) {
        const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("Unhandled Rejection")
          .addFields({
            name: "Client",
            value: `<@${client.user?.id}>` || "Unavailable",
          })
          .setDescription(
            `\`\`\`
Reason: ${reason instanceof Error ? reason.message : reason}
Stack Trace:
${reason instanceof Error ? reason.stack : "No trace available"}
\`\`\``
          )
          .setTimestamp();

        await channel.send({
          content: `<@&${process.env.ERROR_HANDLER_MENTION_ID}>!`,
          embeds: [embed],
        });
      } else {
        console.error("The channel with the provided ID was not found.");
      }
    } catch (error) {
      console.error("Error sending the message to the channel", error);
    }
    setTimeout(() => process.exit(1), 1000);
  });
};

module.exports = { registerErrorHandlers };
