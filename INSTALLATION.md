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

# Installation guide ℹ️
### 1. Create a Discord Application and Bot ✏️
- Visit [**Discord Developer Portal**](https://discord.com/developers/applications) and create a **New application**.
- Inside your application navigate to the Bot section, add a bot to your application, and copy the bot token.
- Extended guide for this part [**here**](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) 🚨

### 2. Configure Bot Permissions and OAuth2 🛡️
- In the `Bot` settings, configure the necessary permissions (e.g., sending messages, managing slash commands, etc). *Your bot should only have the permissions necessary for its operation. Even during testing, **avoid granting ADMIN privileges** to maintain security and adhere to best practices.*
- Go to `OAuth2` > `URL Generator`, select the scopes `bot` and `applications.commands`, and choose the required permissions. *You can always generate an invite with no permissions and later add permissions via a role. However, setting permissions here will create a permanent role for the bot with those permissions.*
- Generate the invite URL and use it to add your bot to your Discord server.
- Extended guide for this part [**here**](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) 🚨

### 3. Download latest release or Clone the Repository 📥
- Download latest release [here](https://github.com/miguelmikkey/discordjs-bot-template/releases/)
- (Optional) Clone the template repository to your local machine if you plan on working or improve it.
```bash
git clone https://github.com/miguelmikkey/discordjs-bot-template.git
cd <repo_folder>
```

### 4. Install Node.js and Project Dependencies 💿
- Install `Node.js`, version 18 or newer is required. [**nodejs.org/en/download**](https://nodejs.org/en/download)
- Install all project dependencies:
```bash
npm install
```

### 5. (OPTIONAL) Create your MongoDB database 💾
This step is optional and is only required if you think your bot might use a database in the future. If you want some useful information about MongoDB and Mongoose, keep reading:
- [Getting Started with MongoDB & Mongoose](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

### 6. Configure Environment Variables 📝
- Create a `.env` file in the root directory or rename de existing `.env.example` to `.env`.
```bash
# General variables
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_bot_client_id
DEV_GUILD_ID=your_dev_guild_id # For command propagation and error handling purposes

# Database variables (Optional incase you need a database)
DATABASE_ENABLED=false 
MONGO_URI=

# Optional variables
ERROR_HANDLER_CHANNEL_ID=your_error_handler_channel_id
ERROR_HANDLER_MENTION_ID=the_role_you_want_to_be_mentioned
```

### 7. Run the Bot 🏃
- Once you have everything ready try and start your bot using:
```bash
node app.js
# or if you have nodemon
nodemon app.js
```
Check [**nodemon**](https://www.npmjs.com/package/nodemon) for an easier development experience.

Your console should look like this:
<img src="https://i.imgur.com/4h73e9S.png">
***Don't worry if you see other logs, this output can change as the bot is updated***
### 8. Test the Bot 🤖
- If the bot is online and has the required permissions, you can go ahead and test a few commands to see if everything is running well.
    - available commands: `/testButton`, `/testModal`, `/testSelect`

- (Optional) Test **error handling** by intentionally triggering errors.<br>
e.g.: Add this code at the end of your `app.js` to create an `UncaughtException` error.
```js
setTimeout(() => {
  throw new Error("Test uncaught exception");
}, 1000);
```
A message should be sent at the channel defined at `.env` > `ERROR_HANDLER_CHANNEL_ID`.
<img src="https://i.imgur.com/22s3AKF.png">

### 9. Congrats you have a bot! 😄
If you found this repository useful, please **consider giving it a star ⭐** on GitHub. Your support helps to improve the project and encourages further contributions!

- [**Support server**](http://discord.com/invite/dmVMDnm5df) *(My personal server)*