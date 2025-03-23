const { ShardingManager } = require("discord.js");
require("dotenv").config();
const { colorize } = require("./src/assets/colors");

// shard manager (https://discordjs.guide/sharding)
const manager = new ShardingManager("./app.js", {
  token: process.env.DISCORD_TOKEN,
  totalShards: "auto",
  respawn: true,
});

// shard manager events
manager.on("shardCreate", (shard) => {
  console.log(
    `${colorize().green}[sharding] ${colorize().white}Launched shard ${
      colorize().blue
    }#${shard.id}${colorize().reset}`
  );

  // log whenever a shard is ready
  shard.on("ready", () => {
    console.log(
      `${colorize().green}[sharding] ${colorize().white}Shard ${
        colorize().blue
      }#${shard.id}${colorize().white} is ready${colorize().reset}`
    );
  });

  // check for shard disconnect/reconnect
  shard.on("disconnect", () => {
    console.log(
      `${colorize().yellow}[sharding] ${colorize().white}Shard ${
        colorize().blue
      }#${shard.id}${colorize().white} disconnected${colorize().reset}`
    );
  });

  // check for shard reconnect
  shard.on("reconnecting", () => {
    console.log(
      `${colorize().yellow}[sharding] ${colorize().white}Shard ${
        colorize().blue
      }#${shard.id}${colorize().white} reconnecting${colorize().reset}`
    );
  });

  // check for shard death
  shard.on("death", (process) => {
    console.log(
      `${colorize().red}[sharding] ${colorize().white}Shard ${
        colorize().blue
      }#${shard.id}${colorize().white} died with exit code ${process.exitCode}${
        colorize().reset
      }`
    );
  });

  shard.on("error", (error) => {
    console.error(
      `${colorize().red}[sharding] ${colorize().white}Shard ${
        colorize().blue
      }#${shard.id}${colorize().white} encountered an error:${
        colorize().reset
      }`,
      error
    );
  });
});

// Start spawning shards
manager
  .spawn()
  .then(() => {
    console.log(
      `${colorize().green}[sharding] ${
        colorize().white
      }All shards launched successfully${colorize().reset}`
    );
  })
  .catch((error) => {
    console.error(
      `${colorize().red}[sharding] ${colorize().white}Failed to spawn shards:${
        colorize().reset
      }`,
      error
    );
  });

// Global error handlers
process.on("unhandledRejection", (error) => {
  console.log(
    `${colorize().red}[error] ${
      colorize().white
    }An unhandled rejection was found in Sharding Manager:${colorize().reset}`
  );
  console.error(error);
});

process.on("uncaughtException", (error) => {
  console.log(
    `${colorize().red}[error] ${
      colorize().white
    }An Uncaught exception was found in Sharding Manager:${colorize().reset}`
  );
  console.error("Uncaught exception:", error);
});
