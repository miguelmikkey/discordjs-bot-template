const { REST, Routes } = require("discord.js");
const { colorize } = require("../assets/colors");

async function registerSlashCommands(client) {
  // shard 0 handles command registration preventing conflicts
  if (client.shard && !client.shard.ids.includes(0)) {
    console.log(
      `${colorize().yellow}[handlers] ${
        colorize().white
      }Skipping command registration on shard #${
        client.shard.ids[0]
      } (only shard 0 registers commands)${colorize().reset}`
    );
    return;
  }

  // make sure the client.application is available
  if (!client.application) {
    console.error(
      "client.application is not available. Make sure the client is connected to the gateway."
    );
    return;
  }

  // separate commands into global and guild-only
  const globalCommands = [];
  const guildOnlyCommands = [];

  for (const command of client.commands.values()) {
    // skip disabled commands
    if (command.enabled === false) continue;

    // check if command is guild-only or global
    if (command.guildOnly) {
      guildOnlyCommands.push(command.data.toJSON());
    } else {
      globalCommands.push(command.data.toJSON());
    }
  }

  try {
    const devGuildId = process.env.DEV_GUILD_ID;

    // register guild-only commands in development server
    if (devGuildId && guildOnlyCommands.length > 0) {
      const guild = client.guilds.cache.get(devGuildId);

      if (!guild) {
        console.warn(
          `${colorize().yellow}[handlers] ${
            colorize().white
          }Development guild not found. Guild-only commands will not be registered.${
            colorize().reset
          }`
        );
      } else {
        await guild.commands.set(guildOnlyCommands);
        console.log(
          `${colorize().green}[handlers] ${colorize().white}Registered ${
            colorize().yellow
          }${guildOnlyCommands.length}${
            colorize().white
          } guild-only commands in development server.${colorize().reset}`
        );
      }
    }

    // register global commands
    if (globalCommands.length > 0) {
      await client.application.commands.set(globalCommands);
      console.log(
        `${colorize().green}[handlers] ${colorize().white}Registered ${
          colorize().yellow
        }${globalCommands.length}${colorize().white} global commands.${
          colorize().reset
        }`
      );
    }
  } catch (error) {
    console.error(
      `${colorize().red}[handlers] ${
        colorize().white
      }Failed to register commands:${colorize().reset}`,
      error
    );
  }
}

module.exports = { registerSlashCommands };
