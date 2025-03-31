const { MessageFlags } = require("discord.js");
const { isDatabaseAvailable } = require("../../database/mongoose");
const { handleDiscordError } = require("../../utils/errorHandler");
const { handleCooldown } = require("../../handlers/cooldown");
const { regularErrorEmbed, WarningEmbed } = require("../../assets/embeds");
const t = require("../../utils/translate");

module.exports = {
  name: "interactionCreate",
  execute: async (client, interaction) => {
    // Get the user's locale from the interaction
    const locale = interaction.guild.preferredLocale || "en_US";

    try {
      /*
       * Check if the interaction is a command
       * If it is, execute the command from ./src/commands/${interaction.commandName}.js
       * dynamic commands are nonsense so we don't need to check for them
       */
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) {
          console.warn(`⚠️ Command not found: ${interaction.commandName}`);
          return;
        }

        // Check if command is disabled (enabled: false)
        if (command.enabled === false) {
          const embedDisabled = WarningEmbed(
            t(locale, "interactionCreate.commandDisabled")
          );
          return await interaction.reply({
            embeds: [embedDisabled],
            flags: MessageFlags.Ephemeral,
          });
        }

        // Check if command is in maintenance mode
        if (command.maintenance === true) {
          const embedMNTCE = WarningEmbed(
            t(locale, "interactionCreate.commandMaintenance")
          );
          return await interaction.reply({
            embeds: [embedMNTCE],
            flags: MessageFlags.Ephemeral,
          });
        }

        // Check if the command requires a database connection
        // Use either the new "database" property or fallback to requirements.database
        const requiresDatabase =
          command.database ?? command.requirements?.database;
        if (requiresDatabase && !isDatabaseAvailable(client)) {
          const embedDB = regularErrorEmbed(
            t(locale, "interactionCreate.databaseRequired")
          );
          return await interaction.reply({
            embeds: [embedDB],
            flags: MessageFlags.Ephemeral,
          });
        }

        // Check if command requires NSFW channel
        if (command.nsfw === true && !interaction.channel.nsfw) {
          const embedNSFW = regularErrorEmbed(
            t(locale, "interactionCreate.nsfwRequired")
          );
          return await interaction.reply({
            embeds: [embedNSFW],
            flags: MessageFlags.Ephemeral,
          });
        }

        // Check cooldown
        if (command.cooldown) {
          const cooldownResult = handleCooldown(command, interaction.user.id);
          if (cooldownResult.onCooldown) {
            const embedCD = regularErrorEmbed(
              t(locale, "interactionCreate.cooldown", {
                time: cooldownResult.timeLeft,
                command: interaction.commandName,
              })
            );
            return await interaction.reply({
              embeds: [embedCD],
              flags: MessageFlags.Ephemeral,
            });
          }
        }

        await command.execute(interaction);

        /*
         * Check if the interaction is a button
         * If it is, execute the button handler from ./src/interactions/buttons/${interaction.customId}.js
         * Dynamic button handlers can be used by setting the customId to a base command name
         * example of a dynamic button handler: customId = "exampleButton_1"
         * incase your bot generates multiple buttons with different customIds with the same base command
         */
      } else if (interaction.isButton()) {
        const fullCustomId = interaction.customId;
        let handler = client.buttonHandlers.get(fullCustomId);
        if (!handler) {
          const baseCommand = fullCustomId.split("_")[0];
          if (baseCommand !== fullCustomId) {
            handler = client.buttonHandlers.get(baseCommand);
          }
        }

        if (handler) {
          await handler.execute(interaction, fullCustomId);
        } else {
          console.warn(`No handler found for button: ${fullCustomId}`);
          await interaction.reply({
            content: t(locale, "interactionCreate.noButtonHandler"),
            flags: MessageFlags.Ephemeral,
          });
        }

        /*
         * Check if the interaction is a select menu
         * If it is, execute the select menu handler from ./src/interactions/selectMenus/${interaction.customId}.js
         * Dynamic select menu handlers can be used by setting the customId to a base command name
         * example of a dynamic select menu handler: customId = "exampleSelectMenu_1"
         * incase your bot generates multiple select menus with different customIds with the same base command
         */
      } else if (interaction.isStringSelectMenu()) {
        const fullCustomId = interaction.customId;
        let handler = client.menuHandlers.get(fullCustomId);

        if (!handler) {
          const baseCommand = fullCustomId.split("_")[0];
          if (baseCommand !== fullCustomId) {
            handler = client.menuHandlers.get(baseCommand);
          }
        }
        if (handler) {
          await handler.execute(interaction, fullCustomId);
        } else {
          console.warn(`No handler found for select menu: ${fullCustomId}`);
          await interaction.reply({
            content: t(locale, "interactionCreate.noMenuHandler"),
            flags: MessageFlags.Ephemeral,
          });
        }

        /*
         * Check if the interaction is a modal submit
         * If it is, execute the modal handler from ./src/interactions/modals/${interaction.customId}.js
         * Dynamic modal handlers can be used by setting the customId to a base command name
         * example of a dynamic modal handler: customId = "exampleModal_1"
         * incase your bot generates multiple modals with different customIds with the same base command
         * thanks copilot for the comments :)
         */
      } else if (interaction.isModalSubmit()) {
        const fullCustomId = interaction.customId;
        let handler = client.modalHandlers.get(fullCustomId);
        if (!handler) {
          const baseCommand = fullCustomId.split("_")[0];
          if (baseCommand !== fullCustomId) {
            handler = client.modalHandlers.get(baseCommand);
          }
        }
        if (handler) {
          await handler.execute(interaction, fullCustomId);
        } else {
          console.warn(`No handler found for modal: ${fullCustomId}`);
          await interaction.reply({
            content: t(locale, "interactionCreate.noModalHandler"),
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    } catch (error) {
      // Try to handle with our Discord error handler first
      const wasHandled = await handleDiscordError(error, interaction);

      // If the error was not a Discord API error or couldn't be handled, use generic error handling
      if (!wasHandled) {
        console.error("Error in interactionCreate event:", error);

        // If the interaction has already been deferred or replied to, send a follow-up message
        if (interaction.deferred || interaction.replied) {
          await interaction.followUp({
            content: t(locale, "interactionCreate.interactionError"),
            flags: MessageFlags.Ephemeral,
          });
        } else {
          await interaction.reply({
            content: t(locale, "interactionCreate.interactionError"),
            flags: MessageFlags.Ephemeral,
          });
        }
      }
    }
  },
};
