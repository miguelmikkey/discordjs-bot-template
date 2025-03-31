const { SlashCommandBuilder } = require("discord.js");

// importing the UserPoints model
const UserPoints = require("../../database/models/UserPoints");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testdb")
    .setDescription("Command to test the database")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adds points to your user")
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("Amount of points to add")
            .setRequired(true)
            .setMinValue(1)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Removes points from your user")
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("Amount of points to remove")
            .setRequired(true)
            .setMinValue(1)
        )
    ),
  enabled: true,
  devGuildOnly: true,
  database: true,
  cooldown: 5,
  nsfw: false,
  maintenance: false,

  async execute(interaction) {
    // defer the reply to ensure the interaction does not time out
    await interaction.deferReply();

    try {
      const userId = interaction.user.id;
      const subcommand = interaction.options.getSubcommand();
      const amount = interaction.options.getInteger("amount");

      // look for the user's points in the database or create a new entry
      let userPoints = await UserPoints.findOne({ userId });

      if (!userPoints) {
        userPoints = new UserPoints({ userId, points: 0 });
      }

      // updates the user's points based on the subcommand
      let message = "";
      if (subcommand === "add") {
        userPoints.points += amount;
        message = `You have added ${amount} points to your user, you now have ${userPoints.points} points.`;
      } else if (subcommand === "remove") {
        // No permitir puntos negativos
        if (userPoints.points < amount) {
          userPoints.points = 0;
          message = `You tried to remove ${amount} points from your user, but you don't have enough points. Your points have been set to 0.`;
        } else {
          userPoints.points -= amount;
          message = `You have removed ${amount} points from your user, you now have ${userPoints.points} points.`;
        }
      }

      // just to update the lastUpdated field
      userPoints.lastUpdated = Date.now();

      // saves the updated user points
      await userPoints.save();

      // send the reply to the user
      await interaction.editReply(message);
    } catch (error) {
      console.error("Command error (testDB):", error);
      await interaction.editReply({
        content:
          "There was an error while executing the command, please try again later.",
      });
    }
  },
};
