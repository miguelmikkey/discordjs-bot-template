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


### Connection Management

The `mongoose.js` file manages:
- Database connection and disconnection
- Connection status tracking
- Error handling for database operations

## Using Database Models

### Existing Models

- **UserPoints**: Tracks user points/currency for economy features

### Creating a New Model

1. Create a new file in the `models/` directory:

```javascript
// models/YourModel.js
const mongoose = require('mongoose');

const yourModelSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // Add other fields as needed
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add any methods to your schema
yourModelSchema.methods.customMethod = function() {
  // Method implementation
};

module.exports = mongoose.model('YourModel', yourModelSchema);
```

mongoose [docs](https://mongoosejs.com/docs/).