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


## How Interaction Handlers Work

When a user interacts with a component (like clicking a button), the bot looks for a handler file matching the component's `customId`. Handlers should export an `execute` function that receives the interaction object.

## Creating Interaction Handlers

### Button Handler Example

```js
const { MessageFlags } = require("discord.js");

// Import the translate function
const t = require("../../utils/translate");

module.exports = {
  // The customId must match the handler in interactions/buttons/exampleButton.js
  customId: "exampleButton",
  async execute(interaction) {
    // Get the guild's preferred locale
    const locale = interaction.guild.preferredLocale || "en_US";

    // Ephemeral reply to the button click
    await interaction.reply({
      content: t(locale, "interactions.buttons.exampleButton"),
      flags: MessageFlags.Ephemeral,
    });
  },
};
```