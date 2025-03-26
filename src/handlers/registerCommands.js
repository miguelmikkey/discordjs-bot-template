const { colorize } = require("../assets/colors");

async function registerSlashCommands(client) {
  // Make sure the client.application is available
  if (!client.application) {
    console.error(
      "client.application is not available. Make sure the client is connected to the gateway."
    );
    return;
  }

  // Split commands into dev-only and global commands
  const devOnlyCommands = [];
  const globalCommands = [];

  // Categorize commands based on devGuildOnly property
  client.commands.forEach((command) => {
    // Convert command to JSON format
    const commandJson = command.data.toJSON();

    // Check if command should be dev guild only
    if (command.devGuildOnly === true) {
      devOnlyCommands.push(commandJson);
    } else {
      globalCommands.push(commandJson);
    }
  });

  // Log the command counts for clarity
  console.log(
    `${colorize().yellow}[commands]🔄 ${colorize().white}Registering ${
      colorize().yellow
    }${devOnlyCommands.length}${colorize().white} dev-only commands and ${
      colorize().yellow
    }${globalCommands.length}${colorize().white} global commands${
      colorize().reset
    }`
  );

  // Register dev-only commands to dev guild if DEV_GUILD_ID exists
  if (process.env.DEV_GUILD_ID && devOnlyCommands.length > 0) {
    const guild = client.guilds.cache.get(process.env.DEV_GUILD_ID);
    if (!guild) {
      console.warn(
        `${colorize().yellow}[warning]⚠️ ${
          colorize().white
        }Development guild not found. Dev-only commands cannot be registered.${
          colorize().reset
        }`
      );
    } else {
      // Get existing guild commands and filter out dev-only commands
      const existingCommands = await guild.commands.fetch();
      const existingDevOnlyIds = existingCommands
        .filter((cmd) => !globalCommands.some((gcmd) => gcmd.name === cmd.name))
        .map((cmd) => cmd.id);

      // Register the dev-only commands
      await guild.commands.set(devOnlyCommands);

      console.log(
        `${colorize().green}[commands]✅ ${colorize().white}Registered ${
          colorize().yellow
        }${devOnlyCommands.length}${
          colorize().white
        } dev-only commands in development guild${colorize().reset}`
      );
    }
  }

  // Register global commands if any exist
  if (globalCommands.length > 0) {
    await client.application.commands.set(globalCommands);
    console.log(
      `${colorize().green}[commands]✅ ${colorize().white}Registered ${
        colorize().yellow
      }${globalCommands.length}${colorize().white} commands globally${
        colorize().reset
      }`
    );
  } else {
    console.log(
      `${colorize().green}[commands]✅ ${colorize().white}Registered ${
        colorize().yellow
      }${globalCommands.length}${colorize().white} commands globally${
        colorize().reset
      }`
    );
  }
}

module.exports = { registerSlashCommands };
