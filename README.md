<div style="text-align:center" align="center">

# Discord.js Bot template | 2025 ✅

<a href="https://discordjs.guide/" target="_blank">![Static Badge](https://img.shields.io/badge/DiscordJS-guide-379C6F)</a>
![discordjsversion](https://img.shields.io/badge/discord.js-^14.18.0-5865f2)
![GitHub contributors](https://img.shields.io/github/contributors/miguelmikkey/discordjs-bot-template?color=blue)
![commits](https://badgen.net/github/commits/miguelmikkey/discordjs-bot-template/)
![master](https://img.shields.io/github/last-commit/miguelmikkey/discordjs-bot-template/main)
![Maintenance](https://img.shields.io/maintenance/yes/2025)
![GitHub Created At](https://img.shields.io/github/created-at/miguelmikkey/discordjs-bot-template)
![GitHub Repo stars](https://img.shields.io/github/stars/miguelmikkey/discordjs-bot-template)

</div>

> [!CAUTION]
> **This repository is the one I personally use as a template for my projects.** Please exercise caution and review the code before using it, as it is modified whenever I need to improve or implement something and may not correspond to the latest release. For better stability, always use the [**latest release**](https://github.com/miguelmikkey/discordjs-bot-template/releases/).



This repository contains a basic template for creating Discord bots using `discord.js`, `pm2` for process management and `.env` for environment variable configuration.

## Features 🎨

- **Basic structure** to start your own project.
- [**Discord.js**](https://discord.js.org/): Library to interact with the Discord API.
- [**PM2**](https://pm2.keymetrics.io/): Process manager for Node.js applications, making it easy to run and monitor your bot.
- [**.env**](https://www.npmjs.com/package/dotenv): Environment variable file to securely manage configuration settings.
- [**Custom Discord notification ErrorHandler**](https://github.com/miguelmikkey/discordjs-bot-template/blob/main/INSTALLATION.md#7-test-the-bot-): Sometimes you may encounter errors after deploying your bot; that's why I usually link `error handlers` to a channel in a private Discord server so I can get notified.<br>
- [**locales**](https://github.com/miguelmikkey/discordjs-bot-template/tree/main/locales/README.md) folder. Theres nothing like supporting multiple languages if you want your bot to be popular, more information about how to use this below.
- *And much more!*

## Get started 😃
- **Prerequisites and dependencies**<br>
    - `node.js` - version 18 or newer **required** 🚨
    - `discord.js` - version 14.18.0 or newer **required** 🚨
    - `mongoose` - version 8.12.1 or newer **required** 🚨 *(can be disabled)*
    - `dotenv` - not required but **recommended**
    - `pm2` - not required but **recommended**
        - `npm install pm2 -g` *to install it globally*
    - `nodemon` - not required but **recommended**
        - `npm install -g nodemon` *to install it globally*

- **Why this template?** 🤔<br>
This template contains a **versatile** design so you can create **your own** bot regardless of the idea behind it. This repository will be updated with every **discord.js** update, so you won't have to worry about deprecated code.

- **Guides**
    - 💿 Installation [`INSTALLATION.md`](https://github.com/miguelmikkey/discordjs-bot-template/blob/main/INSTALLATION.md)
    - 📃 locale (*Multiple languages*) [`./locales/README.md`](https://github.com/miguelmikkey/discordjs-bot-template/tree/main/locales/README.md)
    - Discord.js [Guide](https://discordjs.guide/#before-you-begin)

## Contributing 💁‍♂️

- Ensure that any new functionality or feature is **general-purpose** and enhances the **template's versatility**. Avoid adding features that are too specialized or tailored to specific use cases.
- **Add comments** to help understand the code.
- Use default **prettier** settings. *(ignore `.md` files)*
- Write clear and descriptive **commit messages**. Each commit should explain the purpose of the change succinctly.
- **Update and maintain documentation** for any new features or changes. Contributions should include clear explanations of functionality, configuration, and usage examples.
- **Provide tests for new features when applicable**. Contributions should not break existing functionality.

> [!NOTE]
> **Im a trainee developer**, Any help or TIPs are welcome. Keep in mind that this is just a template for general-purpose bots; it has to be versatile , efficient, and lightweight. With that said , feel free to fork this repository and submit pull requests. **Contributions are welcome!**

## Useful docs 📚
- [Mongoose docs](https://mongoosejs.com/docs/) *MongoDB*
- [PM2 docs](https://pm2.keymetrics.io/docs/usage/quick-start/)
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
