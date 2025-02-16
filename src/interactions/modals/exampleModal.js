const { MessageFlags } = require("discord.js");

module.exports = {
  customId: "exampleModal",
  async execute(interaction) {
    // Captura el valor ingresado en el campo de texto con customId "exampleInput"
    const userInput = interaction.fields.getTextInputValue("exampleInput");
    // Ahora puedes usar el valor capturado
    await interaction.reply({
      content: `You submitted: **${userInput}**`,
      flags: MessageFlags.Ephemeral,
    });
  },
};
