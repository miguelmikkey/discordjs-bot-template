require("dotenv").config();
const path = require("path");
const { colorize } = require("../assets/colors");
const { errorHandlerEmbed } = require("../assets/embeds");

// This function formats the stack trace to replace the base path with the base folder name
// e.g. /home/user/discord-bot-template -> /discord-bot-template
// This is done to prevent leaking the full path of the bot in the error messages
// which could be a security risk
const formatStackTrace = (stack) => {
  const basePath = process.cwd();
  const baseFolderName = path.basename(basePath);
  return stack
    .split("\n")
    .map((line) =>
      line.replace(new RegExp(basePath, "g"), `/${baseFolderName}`)
    )
    .join("\n");
};

const sendErrorMessage = async (client, errorChannelID, title, messageData) => {
  try {
    // add shard information to the error title
    const shardInfo = client.shard ? `[Shard #${client.shard.ids[0]}] ` : "";
    const fullTitle = `${shardInfo}${title}`;

    // check if we're on the right shard to access the dev server
    const devGuildId = process.env.DEV_GUILD_ID;
    const canAccessDevGuild = devGuildId && client.guilds.cache.has(devGuildId);

    // if we can access the dev guild directly, send the message normally
    if (canAccessDevGuild) {
      const channel = await client.channels
        .fetch(errorChannelID)
        .catch(() => null);

      if (channel) {
        const embed = errorHandlerEmbed(client, fullTitle, messageData);
        await channel.send({
          content: process.env.ERROR_HANDLER_MENTION_ID
            ? `<@&${process.env.ERROR_HANDLER_MENTION_ID}>!`
            : "",
          embeds: [embed],
        });

        console.log(
          `${colorize().green}[error] ${
            colorize().white
          }Error notification sent to support server${colorize().reset}`
        );
        return true;
      }
    }

    // if we can't access the dev guild from this shard, use broadcast
    if (client.shard) {
      console.log(
        `${colorize().yellow}[error] ${
          colorize().white
        }Cannot access dev guild from this shard, broadcasting error...${
          colorize().reset
        }`
      );

      // broadcast to all shards to find the one with access to dev guild
      await client.shard.broadcastEval(
        async (c, { channelId, title, data, roleId, devId }) => {
          // only attempt to send if this shard has access to the dev guild
          if (devId && c.guilds.cache.has(devId)) {
            try {
              const channel = await c.channels
                .fetch(channelId)
                .catch(() => null);
              if (channel) {
                const { errorHandlerEmbed } = require("../assets/embeds");
                const embed = errorHandlerEmbed(c, title, data);

                await channel.send({
                  content: roleId ? `<@&${roleId}>!` : "",
                  embeds: [embed],
                });
                return true;
              }
            } catch (err) {
              console.error("Error sending cross-shard notification:", err);
            }
          }
          return false;
        },
        {
          context: {
            channelId: errorChannelID,
            title: fullTitle,
            data: messageData,
            roleId: process.env.ERROR_HANDLER_MENTION_ID,
            devId: process.env.DEV_GUILD_ID,
          },
        }
      );
    } else {
      console.error(
        `${colorize().red}[error] ${
          colorize().white
        }Cannot access error reporting channel and not in sharded mode${
          colorize().reset
        }`
      );
    }
  } catch (error) {
    console.error("Error in error notification system:", error);
  }
};

const handleExit = (client) => {
  // log which shard is exiting if applicable
  if (client && client.shard) {
    console.error(
      `${colorize().red}[error] ${colorize().white}Shard #${
        client.shard.ids[0]
      } will exit in 1 second${colorize().reset}`
    );
  } else {
    console.error(
      `${colorize().red}[error] ${
        colorize().white
      }Process will exit in 1 second${colorize().reset}`
    );
  }

  setTimeout(() => process.exit(1), 1000);
};

const registerErrorHandlers = (client, errorChannelID) => {
  if (!errorChannelID) {
    console.warn(
      `${colorize().yellow}[warning] ${
        colorize().white
      }No ERROR_HANDLER_CHANNEL_ID provided in .env, error reporting to Discord is disabled${
        colorize().reset
      }`
    );
    return;
  }

  process.on("uncaughtException", async (err) => {
    const formattedStack = formatStackTrace(err.stack);
    const messageData = `Error: ${err.message}\nStack Trace:\n${formattedStack}`;
    await sendErrorMessage(
      client,
      errorChannelID,
      "Uncaught Exception",
      messageData
    );
    handleExit(client);
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
    handleExit(client);
  });

  // log that handlers are registered
  const shardInfo = client.shard ? `for Shard #${client.shard.ids[0]}` : "";
  console.log(
    `${colorize().green}[utils] ${
      colorize().white
    }Error handlers registered ${shardInfo}${colorize().reset}`
  );
};

module.exports = { registerErrorHandlers };
