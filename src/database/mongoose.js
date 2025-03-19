const mongoose = require("mongoose");
const { colorize } = require("../assets/colors");

/**
 * Inicializa la conexión a la base de datos y devuelve el objeto de configuración
 * @returns {Promise<Object>} Objeto con información de la base de datos para asignar a client.database
 */
async function initDatabase() {
  // Verificar si la base de datos está habilitada
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

  // Intentar conectar a MongoDB
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
      `${colorize().yellow}[database] ${
        colorize().white
      }Connecting to MongoDB...${colorize().reset}`
    );
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      // Si no se proporciona MONGO_URI, registrar una advertencia y retornar
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
      `${colorize().green}[database] ${colorize().white}Connected to MongoDB${
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

// Función auxiliar para verificar si la base de datos está habilitada
function isDatabaseEnabled() {
  return process.env.DATABASE_ENABLED !== "false";
}

module.exports = { connectToMongoDB, isDatabaseEnabled, initDatabase };
