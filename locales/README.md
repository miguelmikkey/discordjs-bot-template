## 📁 locales (`Work with multiple languages`)

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
