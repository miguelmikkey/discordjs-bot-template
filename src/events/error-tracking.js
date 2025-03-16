const { EmbedBuilder } = require("discord.js");
require("dotenv").config();

const sendErrorMessage = async (client, errorChannelID, title, messageData) => {
  try {
    const channel = await client.channels.fetch(errorChannelID);
    if (!channel) {
      console.error("The channel with the provided ID was not found.");
      return;
    }
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(title)
      .addFields({
        name: "Client",
        value: `<@${client.user?.id}>` || "Unavailable",
      })
      .setDescription(`\`\`\`${messageData}\`\`\``)
      .setTimestamp();

    await channel.send({
      content: `<@&${process.env.ERROR_HANDLER_MENTION_ID}>!`,
      embeds: [embed],
    });
  } catch (error) {
    console.error("Error sending the message to the channel", error);
  }
};

const handleExit = () => setTimeout(() => process.exit(1), 1000);

const registerErrorHandlers = (client, errorChannelID) => {
  process.on("uncaughtException", async (err) => {
    const messageData = `Error: ${err.message}\nStack Trace:\n${err.stack}`;
    await sendErrorMessage(
      client,
      errorChannelID,
      "uncaughtException!",
      messageData
    );
    handleExit();
  });

  process.on("unhandledRejection", async (reason, promise) => {
    const messageData = `Reason: ${
      reason instanceof Error ? reason.message : reason
    }\nStack Trace:\n${
      reason instanceof Error ? reason.stack : "No trace available"
    }`;
    await sendErrorMessage(
      client,
      errorChannelID,
      "Unhandled Rejection",
      messageData
    );
    handleExit();
  });
};

module.exports = { registerErrorHandlers };
