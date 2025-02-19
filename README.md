# Discord bot 🤖 template for DiscordJS bots

This repository contains a basic template for creating Discord bots using `discord.js`, `pm2` for process management and `.env` for environment variable configuration.

## Features

- **Basic structure** to start your own project.
- [**Discord.js**](https://discord.js.org/): Library to interact with the Discord API.
- [**PM2**](https://pm2.keymetrics.io/): Process manager for Node.js applications, making it easy to run and monitor your bot.
- [**.env**](https://www.npmjs.com/package/dotenv): Environment variable file to securely manage configuration settings.
- **Discord notification ErrorHandler**: Sometimes you may encounter errors after deploying your bot; that's why I usually link `error handlers` to a channel in a personal Discord server so I can get notified.<br>

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

Rename `example.env` to `.env` file in the root directory of the project and add your configuration settings:

```.env
# General variables
DISCORD_TOKEN=your_discord_bot_token

# Optional variables
ERROR_HANDLER_CHANNEL_ID=your_error_handler_channel_id
GUILD_ID=your_guild_id
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

## Dependencies

- `discord.js`: For interacting with the Discord API.
- `dotenv`: For loading environment variables from a .env file.
- `pm2`: For process management.

## Contributing

**¡Im a `Trainee`, any help or TIPs are welcome.**
Keep in mind that this is just a template for general-purpose bots; it has to be versatile , efficient, and lightweight. With that said , feel free to fork this repository and submit pull requests. **Contributions are welcome!**

## License

This project is licensed under the [MIT](https://github.com/miguelmikkey/discord-bot-template/blob/main/LICENSE) License.
