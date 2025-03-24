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

## /discordErrorCodes.js
This will provide information regarding error codes that comes from the *Discord-API* such as `Missing Permissions` or `Missing Access` etc...
### exports
- `ERROR_CODES`: Provides descriptions for each error code, can be found [here](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes).
- `getDiscordErrorMessage`: Gives a more *easy-to-ready* error message providing only with simple details.
- `getErrorCategory`: Gets the error category (`RESOURCE_ERROR`, `PERMISSION_ERROR`, `etc...`)
- `getErrorSource`: Gets where the error is coming from, for example: `Error when using the button exampleButton.js from src/interactions/buttons/x`.

## /errorHandler.js
Handles the error by trying to `console.log()` and `interaction.reply()` the user with information regarding the lack of permissions etc.

### exports
- `handleDiscordError`: well.. this one is self explanatory.

## /errorNotification.js
This is the `custom discord error notification`, this will send an embed to your discord server channel whenever an `uncaughtException` or `unhandledRejection` is triggered. [example](https://github.com/miguelmikkey/discordjs-bot-template/blob/main/INSTALLATION.md#8-test-the-bot-).

### exports
- `registerErrorHandlers`(*marked for future rename*)

## /loadFiles.js
This function performs a deep, recursive search within a specified directory, applying a callback function to every JavaScript (.js) file it encounters.
```js
const loadFiles = (dir, callback) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      loadFiles(fullPath, callback);
    } else if (file.name.endsWith(".js")) {
      callback(fullPath);
    }
  }
};
```

## /translate.js
This provides a function that will translate content based on a locale file `en_US`, `es_ES`, `etc...`