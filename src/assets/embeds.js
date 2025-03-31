const { EmbedBuilder } = require("discord.js");
const { getColor } = require("./colors");

// Error handler notification embed
const errorHandlerEmbed = (client, title, messageData) => {
  return new EmbedBuilder()
    .setColor(getColor("error"))
    .setTitle(title)
    .addFields({
      name: "Client",
      value: `<@${client.user?.id}>` || "Unavailable",
    })
    .setDescription(`\`\`\`${messageData}\`\`\``)
    .setTimestamp();
};

const regularErrorEmbed = (description) => {
  return new EmbedBuilder()
    .setColor(getColor("error"))
    .setDescription(description);
};

const WarningEmbed = (description) => {
  return new EmbedBuilder()
    .setColor(getColor("warning"))
    .setDescription(description);
};

module.exports = { errorHandlerEmbed, regularErrorEmbed, WarningEmbed };
