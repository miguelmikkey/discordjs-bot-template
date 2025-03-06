<div style="text-align:center" align="center">

# Discord bot 🤖 template for DiscordJS bots

![commits](https://badgen.net/github/commits/miguelmikkey/discordjs-bot-template/)
![master](https://img.shields.io/github/last-commit/miguelmikkey/discordjs-bot-template/main)
![discordjsversion](https://img.shields.io/badge/discord.js-^14.18.0-5865f2)
![Maintenance](https://img.shields.io/maintenance/yes/2025)
<a href="https://discordjs.guide/" target="_blank">![Static Badge](https://img.shields.io/badge/DiscordJS-guide-379C6F)</a>

</div>

This repository contains a basic template for creating Discord bots using `discord.js`, `pm2` for process management and `.env` for environment variable configuration.

## Features

- **Basic structure** to start your own project.
- [**Discord.js**](https://discord.js.org/): Library to interact with the Discord API.
- [**PM2**](https://pm2.keymetrics.io/): Process manager for Node.js applications, making it easy to run and monitor your bot.
- [**.env**](https://www.npmjs.com/package/dotenv): Environment variable file to securely manage configuration settings.
- [**Discord notification ErrorHandler**](#errorhandler-example-i-find-this-very-useful-for-production): Sometimes you may encounter errors after deploying your bot; that's why I usually link `error handlers` to a channel in a personal Discord server so I can get notified.<br>
- [**locales**](#-locales-add-multiple-languages-to-your-bot) folder. Theres nothing like supporting multiple languages if you want your bot to be popular, more information about how to use this below.

## ErrorHandler example (_I find this very useful for production_)

<img src="https://i.imgur.com/LZoe93x.png">

## Prerequisites

- Node.js (version 14 or later)
- PM2 (install globally using `npm install pm2 -g`)

## Installation

### 1. **Clone the repository:**

```bash
git clone https://github.com/miguelmikkey/discord-bot-template.git
cd discord-bot-template
```

### 2. Install dependencies:

By default, npm install will install all modules listed as dependencies in package

```console
npm install
```

### 3. Set up environment variables:

Rename `.env.example` to `.env` file in the root directory of the project and add your configuration settings:

```.env
# General variables
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_bot_id
DEV_GUILD_ID=your_dev_guild_id # For command propagation purposes

# Optional variables
ERROR_HANDLER_MENTION_ID=the_role_you_want_to_be_mentioned
ERROR_HANDLER_CHANNEL_ID=your_error_handler_channel_id # Role ID
GUILD_ID=your_guild_id # For error handler purposes
```

## Usage

- **Commands:** Customize the bot commands in the commands directory.
- **Events:** Handle Discord events in the events directory.
- **Database:** Use the models directory to define your MongoDB schemas.
- **Error handler channel:** `uncaughtException` and `unhandledRejection` will be notified in your personal `discord-channel`

  ## Example commands:

- `/testButton` <br>
  <img src="https://i.imgur.com/TK2f5eW.png">
- `/testModal` <br>
  <img src="https://i.imgur.com/jGcKKAQ.png">
- `/testSelect` <br>
  <img src="https://i.imgur.com/3kuYbMz.png">

## 📁 locales (`Add multiple languages to your bot`)

The variables you will have to use around your code:

- `t`: This will import the translate function from `translate.js`
- `locale`: This will detect the server's preferred language. **Note that this only works if the server has the Community feature enabled**; otherwise, it defaults to `en_US`. You can modify this behavior as needed, such as by adding an option for users to switch between languages.

### Example:

```js
const t = require("./src/utils/translate");
const locale = guild.preferredLocale || "en_US";

const embed = new EmbedBuilder()
  .setTitle(t(locale, "embeds.exampleTitle"))
  .setDescription(
    t(locale, "embeds.exampleDescription", {
      userID: interaction.user.id,
    })
  );
```

```json
// .JSON file (/locales/en_US.json)
{
  "embeds": {
    "exampleTitle": "This is a title",
    "exampleDescription": "Hey <@{userID}>, this is a description!"
  }
}
```

```json
// .JSON file (/locales/es_ES.json)
{
  "embeds": {
    "exampleTitle": "Esto es un título.",
    "exampleDescription": "Hey <@{userID}>, esto es una descripción!"
  }
}
```

In this example, if the embed is triggered in a server where "English" is selected as the preferred language, it will use the first option (`en_US`) for translation. However, if "Spanish" is selected, it will use `es_ES` instead. If there is no `es_ES` file available, it will default to `en_US`.

### Example with the `/testButton` command.

<img src="https://i.imgur.com/dynX26p_d.webp?maxwidth=760&fidelity=grand">

## Dependencies

- `discord.js`: For interacting with the Discord API.
- `dotenv`: For loading environment variables from a .env file.
- `pm2`: For process management.

## Contributing

> [!NOTE] > **¡Im a Trainee**
> Any help or TIPs are welcome. Keep in mind that this is just a template for general-purpose bots; it has to be versatile , efficient, and lightweight. With that said , feel free to fork this repository and submit pull requests. **Contributions are welcome!** :D

## License

This project is licensed under the [MIT](https://github.com/miguelmikkey/discord-bot-template/blob/main/LICENSE) License.
