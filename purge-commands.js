const { REST, Routes } = require("discord.js");
const config = require("./src/config/config");
const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

// Commands are loaded dynamically from the commands folder in the index.js file
// if you want to delete all commands, you can use the following script
// type `node purge-commands.js`. This will delete all commands from the bot.
// This is useful when you want to clean up all the commands and start fresh.

(async () => {
  try {
    console.log("🗑️ Deleting all commands...");

    const commands = await rest.get(
      Routes.applicationCommands(config.CLIENT_ID)
    );

    for (const command of commands) {
      await rest.delete(
        Routes.applicationCommand(config.CLIENT_ID, command.id)
      );
      console.log(`✅ Command deleted: ${command.name}`);
    }

    console.log("🚀 All commands have been deleted!");
  } catch (error) {
    console.error("❌ Error deleting commands:", error);
  }
})();
