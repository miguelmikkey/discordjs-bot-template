const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testbutton")
    .setDescription("Tests the example button interaction"),
  async execute(interaction) {
    // Create a button with the customId matching the handler in interactions/buttons/exampleButton.js
    const button = new ButtonBuilder()
      .setCustomId("exampleButton")
      .setLabel("Click me!")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      content: "Press the button below:",
      components: [row],
    });
  },
};
