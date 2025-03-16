const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("template")
    .setDescription("This is a template command."),

  // Enable or disable a command, disabled commands will not be registered
  // and will not be available to use in the Discord server.
  // If "enabled" is not defined, the command will be enabled by default
  enabled: false,

  async execute(interaction) {
    // YOUR CODE HERE :)

    await interaction.reply("Hello, World!");
  },
};
