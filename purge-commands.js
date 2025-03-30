const { REST, Routes } = require("discord.js");
const config = require("./src/config/config");
const { colorize } = require("./src/assets/colors");
const readline = require("readline");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

// Do (node purge-commands.js --help) to see the help message
// and the available options
// this is a command line tool to delete commands from discord

const argv = yargs(hideBin(process.argv))
  .option("scope", {
    alias: "s",
    describe: "Scope of commands to delete: global, guild, or dev",
    choices: ["global", "guild", "dev"],
    default: "global",
  })
  .option("guildId", {
    alias: "g",
    describe: "Guild ID for guild-specific commands",
    type: "string",
  })
  .option("command", {
    alias: "c",
    describe: "Specific command name to delete (omit to delete all)",
    type: "string",
  })
  .option("force", {
    alias: "f",
    describe: "Skip confirmation prompt",
    type: "boolean",
    default: false,
  })
  .help().argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function confirm(message) {
  return new Promise((resolve) => {
    rl.question(`${message} (y/n): `, (answer) => {
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

async function purgeCommands() {
  try {
    let route;
    let scopeDesc;

    switch (argv.scope) {
      case "global":
        route = Routes.applicationCommands(config.CLIENT_ID);
        scopeDesc = "global";
        break;
      case "guild":
        if (!argv.guildId) {
          console.log(
            `${
              colorize().red
            }Error: Guild ID is required when using guild scope${
              colorize().reset
            }`
          );
          return;
        }
        route = Routes.applicationGuildCommands(config.CLIENT_ID, argv.guildId);
        scopeDesc = `guild (${argv.guildId})`;
        break;
      case "dev":
        if (!config.DEV_GUILD_ID) {
          console.log(
            `${colorize().red}Error: DEV_GUILD_ID is not defined in config${
              colorize().reset
            }`
          );
          return;
        }
        route = Routes.applicationGuildCommands(
          config.CLIENT_ID,
          config.DEV_GUILD_ID
        );
        scopeDesc = `development guild (${config.DEV_GUILD_ID})`;
        break;
    }

    console.log(
      `${colorize().yellow}Fetching ${scopeDesc} commands...${colorize().reset}`
    );
    const commands = await rest.get(route);

    if (commands.length === 0) {
      console.log(
        `${colorize().blue}No ${scopeDesc} commands found to delete.${
          colorize().reset
        }`
      );
      rl.close();
      return;
    }

    let commandsToDelete = commands;
    if (argv.command) {
      commandsToDelete = commands.filter((cmd) => cmd.name === argv.command);
      if (commandsToDelete.length === 0) {
        console.log(
          `${colorize().red}Command "${
            argv.command
          }" not found in ${scopeDesc} scope.${colorize().reset}`
        );
        rl.close();
        return;
      }
    }

    if (argv.command) {
      console.log(
        `${colorize().yellow}Will delete command: ${colorize().brightBlue}${
          argv.command
        }${colorize().yellow} from ${scopeDesc} scope${colorize().reset}`
      );
    } else {
      console.log(
        `${colorize().yellow}Will delete ${colorize().brightRed}ALL ${
          commandsToDelete.length
        } commands${colorize().yellow} from ${scopeDesc} scope:${
          colorize().reset
        }`
      );
      commandsToDelete.forEach((cmd) => {
        console.log(
          `  - ${colorize().brightBlue}${cmd.name}${colorize().reset}`
        );
      });
    }

    // get confirmation unless --force is used
    if (!argv.force) {
      const confirmed = await confirm(
        `${colorize().brightRed}⚠️ Are you sure you want to continue?${
          colorize().reset
        }`
      );
      if (!confirmed) {
        console.log(
          `${colorize().green}Operation cancelled.${colorize().reset}`
        );
        rl.close();
        return;
      }
    }

    // delete commands
    console.log(
      `${colorize().yellow}🗑️ Deleting commands...${colorize().reset}`
    );

    for (const command of commandsToDelete) {
      const deleteRoute =
        argv.scope === "global"
          ? Routes.applicationCommand(config.CLIENT_ID, command.id)
          : Routes.applicationGuildCommand(
              config.CLIENT_ID,
              argv.scope === "dev" ? config.DEV_GUILD_ID : argv.guildId,
              command.id
            );

      await rest.delete(deleteRoute);
      console.log(
        `${colorize().green}✅ Command deleted: ${colorize().brightBlue}${
          command.name
        }${colorize().reset}`
      );
    }

    console.log(
      `${colorize().green}🚀 Command deletion complete!${colorize().reset}`
    );
  } catch (error) {
    console.error(`${colorize().red}❌ Error:${colorize().reset}`, error);
  } finally {
    rl.close();
  }
}

// execute the purgeCommands function
purgeCommands();
