const { MessageFlags } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * Handles the interactionCreate event.
   * Delegates the interaction to the appropriate handler based on its type.
   *
   * @param {Client} client - The Discord client instance.
   * @param {Interaction} interaction - The interaction received.
   */
  execute: async (client, interaction) => {
    try {
      // Check if the interaction is a slash command (chat input command)
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) {
          console.warn(`⚠️ Command not found: ${interaction.commandName}`);
          return;
        }
        await command.execute(interaction);

        // Check if the interaction is a button click
      } else if (interaction.isButton()) {
        const handler = client.buttonHandlers.get(interaction.customId);
        if (handler) {
          await handler.execute(interaction);
        } else {
          console.warn(`No handler found for button: ${interaction.customId}`);
          await interaction.reply({
            content: "No handler found for this button.",
            flags: MessageFlags.Ephemeral,
          });
        }

        // Check if the interaction is a select menu submission
      } else if (interaction.isStringSelectMenu()) {
        const handler = client.menuHandlers.get(interaction.customId);
        if (handler) {
          await handler.execute(interaction);
        } else {
          console.warn(
            `No handler found for select menu: ${interaction.customId}`
          );
          await interaction.reply({
            content: "No handler found for this select menu.",
            flags: MessageFlags.Ephemeral,
          });
        }

        // Check if the interaction is a modal submission
      } else if (interaction.isModalSubmit()) {
        const handler = client.modalHandlers.get(interaction.customId);
        if (handler) {
          await handler.execute(interaction);
        } else {
          console.warn(`No handler found for modal: ${interaction.customId}`);
          await interaction.reply({
            content: "No handler found for this modal.",
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    } catch (error) {
      console.error("Error in interactionCreate event:", error);
      // If the interaction has already been deferred or replied to, send a follow-up message
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({
          content: "There was an error processing the interaction.",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "There was an error processing the interaction.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
