const { MessageFlags } = require("discord.js");

module.exports = {
  // El customId debe coincidir con el definido en el componente del botón
  customId: "exampleButton",
  async execute(interaction) {
    // Responde de forma efímera para confirmar que se hizo clic en el botón
    await interaction.reply({
      content: "**You clicked the example button!**",
      flags: MessageFlags.Ephemeral,
    });
  },
};
