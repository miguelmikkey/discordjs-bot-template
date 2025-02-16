const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testmodal")
    .setDescription("Tests the example modal interaction"),
  async execute(interaction) {
    // Create a modal with a customId that matches the handler in interactions/modals/exampleModal.js
    const modal = new ModalBuilder()
      .setCustomId("exampleModal")
      .setTitle("Example Modal");

    // Add a text input field to the modal
    const textInput = new TextInputBuilder()
      .setCustomId("exampleInput")
      .setLabel("Enter some text")
      .setPlaceholder("Type here")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    // Each text input must be wrapped in an action row
    const actionRow = new ActionRowBuilder().addComponents(textInput);
    modal.addComponents(actionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  },
};
