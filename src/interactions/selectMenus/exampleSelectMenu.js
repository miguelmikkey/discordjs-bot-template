const { MessageFlags } = require("discord.js");

// Import the translate function
const t = require("../../utils/translate");

module.exports = {
  customId: "exampleSelectMenu",
  async execute(interaction) {
    // Get the guild's preferred locale
    const locale = interaction.guild.preferredLocale || "en_US";

    // Get the selected value from the select menu and store it in a variable
    const selectedValue = interaction.values[0];

    await interaction.reply({
      content: t(locale, "interactions.selectMenus.exampleSelectMenu", {
        option: selectedValue,
      }),
      flags: MessageFlags.Ephemeral,
    });
  },
};
