const { colorize } = require("../assets/colors");
async function registerSlashCommands(client) {
  // Make sure the client.application is available before registering commands to it (it's only available after the 'ready' event)
  if (!client.application) {
    console.error(
      "client.application is not available. Make sure the client is connected to the gateway."
    );
    return;
  }

  // converting the commands to JSON format
  const commandsData = client.commands.map((command) => command.data.toJSON());

  // register commands only in the development guild if DEV_GUILD_ID is set, otherwise register globally
  if (process.env.DEV_GUILD_ID) {
    const guild = client.guilds.cache.get(process.env.DEV_GUILD_ID);
    if (!guild) {
      console.warn(
        "Development guild not found. Make sure the bot is in the guild specified by DEV_GUILD_ID."
      );
    } else {
      await guild.commands.set(commandsData);
      console.log(
        `${colorize().green}[app] ${
          colorize().white
        }Slash commands registered in the development guild.${colorize().reset}`
      );
    }
  } else {
    await client.application.commands.set(commandsData);
    // console log for loaded commands
    // you can remove it if you want, is just to visualize the loaded commands
    console.log(
      `${colorize().green}[handlers => register slash commands] ${
        colorize().white
      }Slash commands registered globally.${colorize().reset}`
    );
  }
}

module.exports = { registerSlashCommands };
