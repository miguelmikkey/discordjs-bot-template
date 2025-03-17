require("dotenv").config();
const path = require("path");
// gets a premade embed from assets/embeds.js
const { errorHandlerEmbed } = require("../assets/embeds");

// This function formats the stack trace to replace the base path with the base folder name
// e.g. /home/user/discord-bot-template -> /discord-bot-template
// This is done to prevent leaking the full path of the bot in the error messages
// which could be a security risk
const formatStackTrace = (stack) => {
  const basePath = process.cwd();
  const baseFolderName = path.basename(basePath); // e.g. "discord-bot-template"
  return stack
    .split("\n")
    .map((line) =>
      line.replace(new RegExp(basePath, "g"), `/${baseFolderName}`)
    )
    .join("\n");
};

const sendErrorMessage = async (client, errorChannelID, title, messageData) => {
  try {
    const channel = await client.channels.fetch(errorChannelID);
    if (!channel) {
      console.error("The channel with the provided ID was not found.");
      return;
    }
    const embed = errorHandlerEmbed(client, title, messageData);

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
    const formattedStack = formatStackTrace(err.stack);
    const messageData = `Error: ${err.message}\nStack Trace:\n${formattedStack}`;
    await sendErrorMessage(
      client,
      errorChannelID,
      "uncaughtException!",
      messageData
    );
    handleExit();
  });

  process.on("unhandledRejection", async (reason, promise) => {
    let stack = "No trace available";
    if (reason instanceof Error && reason.stack) {
      stack = formatStackTrace(reason.stack);
    }
    const messageData = `Reason: ${
      reason instanceof Error ? reason.message : reason
    }\nStack Trace:\n${stack}`;
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
