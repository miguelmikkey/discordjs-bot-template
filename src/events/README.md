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

# Discord.js [Events](https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files)
### 1. Understanding events
In Discord.js, events are signals emitted by the Discord API whenever something happens in your server or application. These events allow your bot to listen and react to actions, such as a new message being sent, a user joining a server, or even a role being updated. By handling these events, you can execute specific code to respond accordingly, making your bot dynamic and interactive.

Heres an example of the `ready` event, this event is triggered once the bot has successfully connected to Discord and completed its initial setup. It signals that the bot is now fully prepared to start processing events and commands.:
```js
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login('YOUR_BOT_TOKEN');
```
### 2. Available events `^14.18.0`
- [discord.js.org/docs/packages/discord.js/14.18.0/Events:Enum](https://discord.js.org/docs/packages/discord.js/14.18.0/Events:Enum)

### 3. Examples provided
In this repository you'll find `interaction/interactionCreate.js`, `message/messageCreate.js`, `guild/guildCreate.js` and `guild/guildDelete.js` as examples.

- `interactionCreate`: Listens to **Buttons**, **SlashCommands**, **Modals** and **SelectMenus**...*so is very important*.
- `messageCreate`: This event is fired whenever a new message is sent in a channel the bot has access to(*inlcudes bot dms*), allowing it to process or respond to user messages.
<br>
<br>
...*you get the idea*

```js
// Event template example
module.exports = {
  name: "EVENT_NAME_HERE", // This could be guildCreate
  execute: async (client, etc...) => {

    // Your code here 

  },
};
```

> [!NOTE]
> **Events are separated into categories but you can drop events in the root directory events/~ and they will still be handled good.**