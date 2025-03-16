<div style="text-align:center" align="center">

# Discord.js Bot template | 2025✅

<a href="https://discordjs.guide/" target="_blank">![Static Badge](https://img.shields.io/badge/DiscordJS-guide-379C6F)</a>
![discordjsversion](https://img.shields.io/badge/discord.js-^14.18.0-5865f2)
![GitHub contributors](https://img.shields.io/github/contributors/miguelmikkey/discordjs-bot-template?color=blue)
![commits](https://badgen.net/github/commits/miguelmikkey/discordjs-bot-template/)
![master](https://img.shields.io/github/last-commit/miguelmikkey/discordjs-bot-template/main)
![Maintenance](https://img.shields.io/maintenance/yes/2025)
![downloads](https://img.shields.io/github/downloads/miguelmikkey/discordjs-bot-template/total)
![GitHub Created At](https://img.shields.io/github/created-at/miguelmikkey/discordjs-bot-template)

</div>

This repository contains a basic template for creating Discord bots using `discord.js`, `pm2` for process management and `.env` for environment variable configuration.

## Features

- **Basic structure** to start your own project.
- [**Discord.js**](https://discord.js.org/): Library to interact with the Discord API.
- [**PM2**](https://pm2.keymetrics.io/): Process manager for Node.js applications, making it easy to run and monitor your bot.
- [**.env**](https://www.npmjs.com/package/dotenv): Environment variable file to securely manage configuration settings.
- [**Custom Discord notification ErrorHandler**](#errorhandler-example-i-find-this-very-useful-for-production): Sometimes you may encounter errors after deploying your bot; that's why I usually link `error handlers` to a channel in a private Discord server so I can get notified.<br>
- [**locales**](https://github.com/miguelmikkey/discordjs-bot-template/tree/main/locales/README.md) folder. Theres nothing like supporting multiple languages if you want your bot to be popular, more information about how to use this below.

## Contributing

- Ensure that any new functionality or feature is **general-purpose** and enhances the **template's versatility**. Avoid adding features that are too specialized or tailored to specific use cases.
- **Add comments** to help understand the code.
- Use default **prettier** settings.
- Write clear and descriptive **commit messages**. Each commit should explain the purpose of the change succinctly.
- **Update and maintain documentation** for any new features or changes. Contributions should include clear explanations of functionality, configuration, and usage examples.
- **Provide tests for new features when applicable**. Contributions should not break existing functionality, and ideally, they come with added unit or integration tests.

> [!NOTE]
> **Im a trainee developer**, Any help or TIPs are welcome. Keep in mind that this is just a template for general-purpose bots; it has to be versatile , efficient, and lightweight. With that said , feel free to fork this repository and submit pull requests. **Contributions are welcome!**

## Useful docs
- [PermissionFlags](https://discord-api-types.dev/api/discord-api-types-v10#PermissionFlagsBits)
- [SlashCommands](https://discordjs.guide/slash-commands/response-methods.html)
- [EmbedBuilder](https://discordjs.guide/popular-topics/embeds.html)
- [ButtonBuilder](https://discordjs.guide/message-components/buttons.html)
- [ModalBuilder](https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals)
- [SelectMenus](https://discordjs.guide/message-components/select-menus.html#building-string-select-menus)
- [Cooldowns](https://discordjs.guide/additional-features/cooldowns.html#resulting-code)
- [Sharding](https://discordjs.guide/sharding/#when-to-shard)
- [OAuth2](https://discordjs.guide/oauth2/#a-quick-example)
## License

This project is licensed under the [MIT](https://github.com/miguelmikkey/discord-bot-template/blob/main/LICENSE) License.
