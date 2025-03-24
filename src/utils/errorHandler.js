const {
  getDiscordErrorMessage,
  getErrorCategory,
  getErrorSource,
} = require("./discordErrorCodes");
const { colorize } = require("../assets/colors");
const { regularErrorEmbed } = require("../assets/embeds");
const { MessageFlags } = require("discord.js");

/**
 * Handles Discord API errors with appropriate logging and user feedback
 * @param {Error} error - The error object (https://discord.com/developers/docs/reference#error-messages)
 * @param {Interaction} interaction - The interaction that triggered the error
 * @returns {boolean} Whether the error was handled
 */
async function handleDiscordError(error, interaction) {
  // If not a Discord API error, return false to let other handlers deal with it
  if (!error || !error.code) {
    return false;
  }

  // Get error information
  const errorMessage = getDiscordErrorMessage(error.code);
  const errorCategory = getErrorCategory(error.code);
  const { filePath, interactionType, interactionId } = getErrorSource(
    error,
    interaction
  );

  // Log detailed error information
  let logColor;
  switch (errorCategory) {
    case "PERMISSION_ERROR":
      logColor = colorize().red;
      break;
    case "RATE_LIMIT_ERROR":
      logColor = colorize().yellow;
      break;
    case "RESOURCE_ERROR":
      logColor = colorize().blue;
      break;
    default:
      logColor = colorize().magenta;
  }

  console.log(
    `${logColor}[discord:${errorCategory}] ${colorize().white}${errorMessage}${
      colorize().reset
    }`
  );
  console.log(
    `${colorize().yellow}[source] ${colorize().white}Error occurred in ${
      colorize().blue
    }${interactionType} "${interactionId}"${colorize().white} at ${
      colorize().blue
    }${filePath}${colorize().reset}`
  );

  // Try to respond to the user
  try {
    // Format user-facing error message based on error category
    let userMessage;
    switch (errorCategory) {
      case "PERMISSION_ERROR":
        userMessage = `**Missing Permissions:** ${getDiscordErrorMessage(
          error.code,
          false
        )}`;
        break;
      case "RATE_LIMIT_ERROR":
        userMessage = `**Rate Limited:** Please try again later.`;
        break;
      case "RESOURCE_ERROR":
        userMessage = `**Resource Not Found:** The requested resource could not be found.`;
        break;
      case "INTERACTION_ERROR":
        userMessage = `**Interaction Failed:** ${getDiscordErrorMessage(
          error.code,
          false
        )}`;
        break;
      default:
        userMessage = `**Error:** ${getDiscordErrorMessage(error.code, false)}`;
    }

    // send the error message to the user if possible
    if (interaction) {
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({
          embeds: [regularErrorEmbed(userMessage)],
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          embeds: [regularErrorEmbed(userMessage)],
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    return true;
  } catch (replyError) {
    console.log(
      `${colorize().yellow}[warning] ${
        colorize().white
      }Could not respond to user: ${replyError.message}${colorize().reset}`
    );
    return true;
  }
}

module.exports = { handleDiscordError };
