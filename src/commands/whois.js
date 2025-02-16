const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Displays user information directly (ephemeral)."),
  async execute(interaction) {
    const user = interaction.user;
    const member = interaction.member; // Available in guild context

    // Field 1: Status (if available)
    let status = "Unknown";
    if (member && member.presence && member.presence.status) {
      status = member.presence.status; // e.g. "online", "offline", "idle", "dnd", etc.
    }

    // Field 2: Account Creation Date
    const accountCreated = `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`;

    // Create the embed with 3 fields
    const infoEmbed = new EmbedBuilder()
      .setColor("#5865F2") // Discord's blurple color
      .setTitle(`Profile of ${user.username}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "📶 Status", value: status, inline: true },
        { name: "📆 Account Created", value: accountCreated, inline: true },
        { name: "🆔 User ID", value: user.id, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: "User Information" });

    // Directly reply with an ephemeral message containing the embed
    await interaction.reply({
      embeds: [infoEmbed],
      flags: MessageFlags.Ephemeral,
    });
  },
};
