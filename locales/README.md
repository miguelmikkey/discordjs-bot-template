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

## 📁 locales (`Work with multiple languages`)
If you plan on building a popular bot, you must ensure that you support multiple languages. Very often, communities have their own primary language set in their settings, with "English, Spanish, Portuguese, and Russian" being the most commonly used languages around Discord.

This method will use `locale` to find the Guilds preferred language, if the bot can't find it it will use `en_US` as default language. And `t` is the function that will locate the message that needs to be sent.

> [!IMPORTANT]  
> This feature is linked to **Community > Server Primary Languege**, if community is disabled the bot wont be able to find `guild.preferredLocale` and will use `en_US` as default everytime. [**Read more**](https://support.discord.com/hc/en-us/articles/360047132851-Enabling-Your-Community-Server#h_01H1W33CQVZCSKQGX9BM602RPP)

### Example:

```js
const t = require("./src/utils/translate");
const locale = guild.preferredLocale || "en_US";

const embed = new EmbedBuilder()
  // Title defined at both "en_US" and "es_ES" json files
  .setTitle(t(locale, "embeds.exampleTitle"))

  // Description defined at both "en_US" and "es_ES" json files
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

In this example, if the embed is triggered in a server where "English" is selected as the preferred language(_Server primary language_), it will use the first option (`en_US`) for translation. However, if "Spanish" is selected, it will use `es_ES` instead. If there is no `es_ES` file available, it will default to `en_US`.

> [!WARNING]  
> If you don't keep language files up to date some messages will give errores like showing the translation path instead of the actual message.
