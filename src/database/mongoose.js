const mongoose = require("mongoose");
const { colorize } = require("../assets/colors");

// check if the database is enabled directly from environment variables
function isDatabaseEnabled() {
  return process.env.DATABASE_ENABLED !== "false";
}

// this is for things that require a database connection (like commands)
function isDatabaseAvailable(client) {
  // check if the client and client.database exists
  if (!client || !client.database) {
    return false;
  }

  // check if the database is enabled and the connection is not null
  return (
    client.database.enabled === true && client.database.connection !== null
  );
}

async function initDatabase() {
  // check if the database is enabled from .env file
  if (!isDatabaseEnabled()) {
    console.log(
      `${colorize().brightBlack}[database] ${
        colorize().white
      }Database connection disabled${colorize().reset}`
    );
    return {
      enabled: false,
      connection: null,
    };
  }

  // if the database is enabled, try to connect to mongodb
  try {
    const dbResult = await connectToMongoDB();
    return {
      enabled: dbResult.status === "connected",
      connection: dbResult.connection,
    };
  } catch (error) {
    console.error(
      `${colorize().red}[database] ${
        colorize().white
      }Error initializing database:${colorize().reset}`,
      error
    );
    return {
      enabled: false,
      connection: null,
    };
  }
}

async function connectToMongoDB() {
  try {
    // Get shard ID for logging
    const shardId =
      global.client && global.client.shard
        ? `Shard #${global.client.shard.ids[0]}`
        : "Unsharded";

    console.log(
      `${colorize().yellow}[database] ${
        colorize().white
      }${shardId} connecting to MongoDB...${colorize().reset}`
    );

    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      // if mongouri is not provided, log an error and return
      console.log(
        `${colorize().red}[database] ${
          colorize().white
        }Disconnected: No MONGO_URI provided in .env file, make sure to add a URI after enabling the database at .env${
          colorize().reset
        }`
      );
      return { status: "error", connection: null };
    }

    // Add optimal connection settings for sharded environment
    const connectionOptions = {
      // Connection pool settings
      maxPoolSize: 10, // Increase this as you add more shards
      minPoolSize: 3, // Maintain minimum connections for faster responses

      // Timeouts
      connectTimeoutMS: 10000, // 10 seconds connection timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout

      // Reconnection settings
      serverSelectionTimeoutMS: 5000, // Server selection timeout
      heartbeatFrequencyMS: 10000, // Check server health every 10 seconds

      // Application information (helpful for monitoring)
      appName: `DiscordBot${
        global.client?.shard ? `-Shard${global.client.shard.ids[0]}` : ""
      }`,

      // Other useful settings
      retryWrites: true,
      retryReads: true,
    };

    await mongoose.connect(mongoURI, connectionOptions);

    console.log(
      `${colorize().green}[database] ${
        colorize().white
      }${shardId} connected to MongoDB${colorize().reset}`
    );

    // Set up more robust event listeners
    mongoose.connection.on("error", (error) => {
      console.error(
        `${colorize().red}[database] ${
          colorize().white
        }${shardId} error connecting to MongoDB:${colorize().reset}`,
        error
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.log(
        `${colorize().yellow}[database] ${
          colorize().white
        }${shardId} disconnected from MongoDB${colorize().reset}`
      );

      // Attempt to reconnect (optional, as mongoose has built-in reconnection)
      setTimeout(() => {
        if (mongoose.connection.readyState === 0) {
          console.log(
            `${colorize().yellow}[database] ${
              colorize().white
            }${shardId} attempting to reconnect to MongoDB...${
              colorize().reset
            }`
          );
          mongoose.connect(mongoURI, connectionOptions).catch((err) => {
            console.error(
              `${colorize().red}[database] ${
                colorize().white
              }Reconnection failed:${colorize().reset}`,
              err
            );
          });
        }
      }, 5000);
    });

    mongoose.connection.on("reconnected", () => {
      console.log(
        `${colorize().green}[database] ${
          colorize().white
        }${shardId} reconnected to MongoDB${colorize().reset}`
      );
    });

    return { status: "connected", connection: mongoose.connection };
  } catch (error) {
    console.error(
      `${colorize().red}[database] ${
        colorize().white
      }Error connecting to MongoDB:${colorize().reset}`,
      error
    );
    return { status: "error", connection: null };
  }
}

// For checking database performance (optional but useful)
async function getDatabaseStats() {
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    return null;
  }

  try {
    return await mongoose.connection.db.stats();
  } catch (error) {
    console.error("Error getting database stats:", error);
    return null;
  }
}

module.exports = {
  connectToMongoDB,
  isDatabaseEnabled,
  initDatabase,
  isDatabaseAvailable,
  getDatabaseStats, // Export the new function
};
