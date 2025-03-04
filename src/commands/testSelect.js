const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

// Import the translate function
const t = require("../utils/translate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testselect")
    .setDescription("Tests the example select menu interaction"),
  async execute(interaction) {
    // Get the guild's preferred locale
    const locale = interaction.guild.preferredLocale || "en_US";

    // Create a select menu with the customId matching the handler in interactions/selectMenus/exampleSelectMenu.js
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("exampleSelectMenu")
      .setPlaceholder(t(locale, "selectMenus.exampleSelectMenu.Placeholder"))
      .addOptions([
        {
          label: t(locale, "selectMenus.exampleSelectMenu.option1"),
          value: t(locale, "selectMenus.exampleSelectMenu.option1"),
          description: t(
            locale,
            "selectMenus.exampleSelectMenu.option1description"
          ),
        },
        {
          label: t(locale, "selectMenus.exampleSelectMenu.option2"),
          value: t(locale, "selectMenus.exampleSelectMenu.option2"),
          description: t(
            locale,
            "selectMenus.exampleSelectMenu.option2description"
          ),
        },
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: t(locale, "commands.testSelectMenu"),
      components: [row],
    });
  },
};
