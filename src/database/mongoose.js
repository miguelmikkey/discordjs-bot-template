const mongoose = require("mongoose");
const { colorize } = require("../assets/colors");
const config = require("../config/config");

// check if the database is enabled directly from environment variables
function isDatabaseEnabled() {
  return config.DBENABLED !== "false";
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
      `${
        colorize().brightBlack
      }[database] database connection disabled in ".env"${colorize().reset}`
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
    console.log(
      `${colorize().yellow}[database]🔄 ${colorize().white}Connecting...${
        colorize().reset
      }`
    );
    const mongoURI = config.MONGO_URI;

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

    await mongoose.connect(mongoURI);

    console.log(
      `${colorize().green}[database]✅ ${colorize().white}Connected to MongoDB${
        colorize().reset
      }`
    );

    mongoose.connection.on("error", (error) => {
      console.error(
        `${colorize().red}[database] ${
          colorize().white
        }Error connecting to MongoDB:${colorize().reset}`,
        error
      );
    });

    mongoose.connection.on("disconnected", () => {
      console.log(
        `${colorize().yellow}[database] ${
          colorize().white
        }Disconnected from MongoDB${colorize().reset}`
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

module.exports = {
  connectToMongoDB,
  isDatabaseEnabled,
  initDatabase,
  isDatabaseAvailable,
};
