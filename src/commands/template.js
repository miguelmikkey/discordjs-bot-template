const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("template")
    .setDescription("This is a template command."),

  // Enable or disable a command, disabled commands will not be registered
  // and will not be available to use in the Discord server.
  // If "enabled" is not defined, the command will be enabled by default
  enabled: false,

  // If "guildOnly" is true, the command will only be registered in DEV_GUILD_ID (development server .env)
  // If "guildOnly" is false, the command will be registered globally
  guildOnly: false,
  requirements: {
    database: false, // require a database connection to run this command
  },

  async execute(interaction) {
    // YOUR CODE HERE :)

    await interaction.reply("Hello, World!");
  },
};
