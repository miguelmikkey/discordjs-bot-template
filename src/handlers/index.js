const { registerCommands } = require("./commands");
const { registerEvents } = require("./events");
const { registerInteractions } = require("./interactions");
const { registerErrorHandlers } = require("../utils/errorNotification");

function initHandlers(client) {
  // load commands
  registerCommands(client);
  // load events
  registerEvents(client);
  // load interactions
  registerInteractions(client);
  // load error handlers (custom embed notifications for uncaught exceptions and promise rejections)
  registerErrorHandlers(client, process.env.ERROR_HANDLER_CHANNEL_ID);
}

module.exports = { initHandlers };
