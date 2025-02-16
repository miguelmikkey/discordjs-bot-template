const {
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testselect")
    .setDescription("Tests the example select menu interaction"),
  async execute(interaction) {
    // Create a select menu with the customId matching the handler in interactions/selectMenus/exampleSelectMenu.js
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId("exampleSelectMenu")
      .setPlaceholder("Choose an option")
      .addOptions([
        {
          label: "Option 1",
          value: "option1",
          description: "This is the first option",
        },
        {
          label: "Option 2",
          value: "option2",
          description: "This is the second option",
        },
      ]);

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: "Please select an option:",
      components: [row],
    });
  },
};
