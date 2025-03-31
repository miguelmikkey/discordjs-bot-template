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

# Discord Bot Handlers

This directory contains handler modules that process different aspects of the bot's functionality. Handlers are responsible for loading, registering, and managing various components like commands, events, and interactive elements.

## Handler Files

| File | Description |
|------|-------------|
| **index.js** | Main entry point that initializes all handlers |
| **commands.js** | Loads slash commands from the `commands` directory and registers them with the bot |
| **events.js** | Loads event listeners from the `events` directory and attaches them to the client |
| **interactions.js** | Registers button, select menu, and modal handlers from the `src/interactions` directory |
| **registerCommands.js** | Registers slash commands with the Discord API (both global and development guild) |
| **cooldown.js** | Manages command cooldown timers to prevent spam |

## How Handlers Work

Handlers follow a consistent pattern:
1. Load files from their respective directories
2. Process and validate each file
3. Register components with the client or Discord API
4. Log the results for monitoring
