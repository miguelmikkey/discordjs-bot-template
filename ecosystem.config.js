const { version, name } = require("./package.json");

// I suggest you to use pm2 to manage your bots application
// https://pm2.keymetrics.io/docs/usage/quick-start/
// https://pm2.keymetrics.io/docs/usage/application-declaration/
// https://pm2.keymetrics.io/docs/usage/startup/ (to start the bot on system boot)

module.exports = {
  apps: [
    {
      name: name,
      script: "index.js",
      exec_mode: "fork",
      instances: 1,
      restart_delay: 1000,
      autorestart: true,
      watch: false, // If set to true, it will restart the bot when a file changes
      // make sure to ignore folders with logs, node_modules, etc
      // otherwise it will restart the bot when a log file is created

      ignore_watch: ["./logs", ".node_modules", ".vscode"],
      version: version,
      max_memory_restart: "512M",

      // You must have a logs folder in the root of your project
      // for this to work, or change the path to your own
      error_file: "./logs/error.log",
      out_file: "./logs/output.log",
    },
  ],
};
