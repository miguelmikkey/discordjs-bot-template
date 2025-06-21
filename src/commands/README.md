<div style="text-align:center" align="center">

# Discord.js Bot template | 2025 ✅

<a href="https://discordjs.guide/" target="_blank">![Static Badge](https://img.shields.io/badge/DiscordJS-guide-379C6F)</a>
![discordjsversion](https://img.shields.io/badge/discord.js-^14.18.0-5865f2)
![GitHub contributors](https://img.shields.io/github/contributors/miguelmikkey/discordjs-bot-template?color=blue)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/miguelmikkey/discordjs-bot-template)
![master](https://img.shields.io/github/last-commit/miguelmikkey/discordjs-bot-template/main)
![Maintenance](https://img.shields.io/maintenance/yes/2025)
![GitHub Created At](https://img.shields.io/github/created-at/miguelmikkey/discordjs-bot-template)
![GitHub Repo stars](https://img.shields.io/github/stars/miguelmikkey/discordjs-bot-template)

</div>
# SlashCommands Guides 🪄  
### 1. [Command permissions](https://discordjs.guide/slash-commands/permissions.html#member-permissions)
- [Bitwise Permission Flags](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)
- [DJS Guide #Member permissions](https://discordjs.guide/slash-commands/permissions.html#member-permissions)

### 2. [Context types](https://discordjs.guide/slash-commands/permissions.html#contexts)
- [InteractionContextType](https://discord-api-types.dev/api/discord-api-types-v10/enum/InteractionContextType)
- [DJS Guide #Contexts](https://discordjs.guide/slash-commands/permissions.html#contexts)
### 3. [Options](https://discordjs.guide/slash-commands/advanced-creation.html#adding-options)
- [DJS Guide](https://discordjs.guide/slash-commands/advanced-creation.html#adding-options)

## Command template *([./src/commands/test/template.js](https://github.com/miguelmikkey/discordjs-bot-template/blob/main/src/commands/test/template.js))*

```js
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("template")
    .setDescription("This is a template command."),
  enabled: false,
  devGuildOnly: true,
  requirements: {
    database: false,
  },

  async execute(interaction) {
    // YOUR CODE HERE :)

    await interaction.reply("Hello, World!");
  },
};
```
- **`enabled`:** if set to `false` the command will be skipped on registering and handling.

- **`database`:** if set to `true` this command will require a `MongoDB` connection to work, if a connection is not stablished the command will not be handled.
- **`devGuildOnly:`** if set to `true` this command will only be registered on the `DEV_GUILD_ID` from `.env`, this **DOES NOT** mean it can't be used by other users, it means it will only be registered there, to hide it from others in the dev guild you must apply [`permissions`](https://discord.js.org/docs/packages/builders/1.10.1/SlashCommandBuilder:Class#setDefaultMemberPermissions) to that command.
