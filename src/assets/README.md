<div style="text-align:center" align="center">

# Discord.js Bot template | 2025✅

<a href="https://discordjs.guide/" target="_blank">![Static Badge](https://img.shields.io/badge/DiscordJS-guide-379C6F)</a>
![discordjsversion](https://img.shields.io/badge/discord.js-^14.18.0-5865f2)
![GitHub contributors](https://img.shields.io/github/contributors/miguelmikkey/discordjs-bot-template?color=blue)
![commits](https://badgen.net/github/commits/miguelmikkey/discordjs-bot-template/)
![master](https://img.shields.io/github/last-commit/miguelmikkey/discordjs-bot-template/main)
![Maintenance](https://img.shields.io/maintenance/yes/2025)
![GitHub Created At](https://img.shields.io/github/created-at/miguelmikkey/discordjs-bot-template)
![GitHub Repo stars](https://img.shields.io/github/stars/miguelmikkey/discordjs-bot-template)

</div>

# Bot assets
If you plan to use similar embeds, colors, modals, buttons, and other elements throughout your bot, consider using this `assets` folder to store your prebuilt components. This approach lets you simply call a function and pass the necessary data to render embeds wherever needed.

### Error handler custom discord notification:
```js
// assets/embeds.js
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
```
**Somewhere else:**
```js
// Importing the errorHandlerEmbed function
const { errorHandlerEmbed } = require("<PATH>/assets/embeds");

// defining the function as "embed"
const embed = errorHandlerEmbed(client, title, messageData);

// calling the "embed" when sending a message
channel.send({embeds: [embed]});
```