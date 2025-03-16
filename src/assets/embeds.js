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

module.exports = { errorHandlerEmbed };
