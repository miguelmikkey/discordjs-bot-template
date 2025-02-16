const { MessageFlags } = require("discord.js");

module.exports = {
  customId: "exampleSelectMenu",
  async execute(interaction) {
    const selectedValue = interaction.values[0];
    await interaction.reply({
      content: `You selected: **${selectedValue}**`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
