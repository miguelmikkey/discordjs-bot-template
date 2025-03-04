const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

// Import the translate function
const t = require("../../src/utils/translate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testbutton")
    .setDescription("Tests the example button interaction"),
  async execute(interaction) {
    // Get the guild's preferred locale
    const locale = interaction.guild.preferredLocale || "en_US";

    // Create a button with the customId matching the handler in interactions/buttons/exampleButton.js
    const button = new ButtonBuilder()
      .setCustomId("exampleButton")
      .setLabel(t(locale, "buttons.testButtonLabel"))
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      content: t(locale, "commands.testButton"),
      components: [row],
    });
  },
};
