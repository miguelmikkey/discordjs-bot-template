const { REST, Routes } = require("discord.js");
const config = require("./src/config/config");

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

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
