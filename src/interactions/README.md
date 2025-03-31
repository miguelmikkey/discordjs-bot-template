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


## Interaction Handlers

This directory contains handlers for Discord component interactions:
- Buttons (`/buttons`)
- Select Menus (`/selectMenus`)
- Modals (`/modals`)

When a user interacts with a component, the bot matches the `customId` to find the correct handler.

## Basic Handler Example

```js
module.exports = {

  customId: "exampleButton",
  async execute(interaction) {

    await interaction.reply({
      content: "This is an example button",
    });
  },
};
```

## Dynamic Handlers with Pattern Matching
```js
module.exports = {
  customId: "ticket", // For exact matches
  pattern: "^ticket_(open|close)_\\d+$", // Regex pattern
  
  async execute(interaction, fullCustomId) {
    // Extract data from customId
    const [base, action, ticketId] = fullCustomId.split("_");
    
    await interaction.reply({
      content: `Processing ${action} for ticket #${ticketId}`,
    });
  }
};
```

#### The handler above will match buttons with IDs like:
- `ticket_open_12345`
- `ticket_close_67890`

### Pattern Matching Priority
1. Exact match by `customId`
2. Match by prefix (e.g., "vote_123" → handler with customId "vote")
3. Match by regex pattern

*In basic terms this will allow you to create interactions such as tickets which use customIds including different ids to interact with the correct ticket etc...*

#### Usage examples
`tickets`, `forms`, `modmails`, `minigames`, `etc...`