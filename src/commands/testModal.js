const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require("discord.js");

// Import the translate function
const t = require("../utils/translate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testmodal")
    .setDescription("Tests the example modal interaction"),
  async execute(interaction) {
    // Get the guild's preferred locale
    const locale = interaction.guild.preferredLocale || "en_US";

    // Create a modal with a customId that matches the handler in interactions/modals/exampleModal.js
    const modal = new ModalBuilder()
      .setCustomId("exampleModal")
      .setTitle(t(locale, "modals.exampleModal.Title"));

    // Add a text input field to the modal
    const textInput = new TextInputBuilder()
      .setCustomId("exampleInput")
      .setLabel(t(locale, "modals.exampleModal.Label"))
      .setPlaceholder(t(locale, "modals.exampleModal.Placeholder"))
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    // Each text input must be wrapped in an action row
    const actionRow = new ActionRowBuilder().addComponents(textInput);
    modal.addComponents(actionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  },
};
