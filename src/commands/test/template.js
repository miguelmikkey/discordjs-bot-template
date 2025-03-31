const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("template")
    .setDescription("This is a template command."),

  // Add any options you want to include in the command
  enabled: false, // Whether command is enabled
  devGuildOnly: false, // Whether command is only available in the dev guild
  database: false, // Replaces requirements.database
  cooldown: 5, // Cooldown in seconds
  nsfw: false, // Whether command requires NSFW channel
  maintenance: false, // Whether command is in maintenance mode

  async execute(interaction) {
    // YOUR CODE HERE :)

    await interaction.reply("Hello, World!");
  },
};
