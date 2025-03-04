const { MessageFlags } = require("discord.js");

// Import the translate function
const t = require("../../utils/translate");

module.exports = {
  customId: "exampleModal",
  async execute(interaction) {
    // Get the guild's preferred locale
    const locale = interaction.guild.preferredLocale;

    // Get the value of the text input field and store it in a variable
    const userInput = interaction.fields.getTextInputValue("exampleInput");

    // Now you can use the user's input in your code
    await interaction.reply({
      content: t(locale, "interactions.modals.exampleModal", {
        input: userInput,
      }),
      flags: MessageFlags.Ephemeral,
    });
  },
};
