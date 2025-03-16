const { MessageFlags } = require("discord.js");

// Import the translate function
const t = require("../../utils/translate");

module.exports = {
  // The customId must match the handler in interactions/buttons/exampleButton.js
  customId: "exampleButton",
  async execute(interaction) {
    // Get the guild's preferred locale
    const locale = interaction.guild.preferredLocale || "en_US";

    // Ephemeral reply to the button click
    await interaction.reply({
      content: t(locale, "interactions.buttons.exampleButton"),
      flags: MessageFlags.Ephemeral,
    });
  },
};
