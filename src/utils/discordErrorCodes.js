const ERROR_CODES = {
  // General errors
  0: "General error (no error code specified)",

  // HTTP response codes
  10001: "Unknown account",
  10002: "Unknown application",
  10003: "Unknown channel",
  10004: "Unknown guild",
  10005: "Unknown integration",
  10006: "Unknown invite",
  10007: "Unknown member",
  10008: "Unknown message",
  10009: "Unknown permission overwrite",
  10010: "Unknown provider",
  10011: "Unknown role",
  10012: "Unknown token",
  10013: "Unknown user",
  10014: "Unknown emoji",
  10015: "Unknown webhook",
  10016: "Unknown webhook service",
  10020: "Unknown ban",
  10026: "Unknown ban",
  10027: "Unknown SKU",
  10028: "Unknown Store Listing",
  10029: "Unknown entitlement",
  10030: "Unknown build",
  10031: "Unknown lobby",
  10032: "Unknown branch",
  10033: "Unknown store directory layout",
  10036: "Unknown redistributable",
  10038: "Unknown gift code",
  10049: "Unknown stream",
  10050: "Unknown premium server subscribe cooldown",
  10057: "Unknown guild template",
  10059: "Unknown discovery category",
  10060: "Unknown sticker",
  10062: "Unknown interaction",
  10063: "Unknown application command",
  10066: "Unknown application command permissions",
  10067: "Unknown Stage Instance",
  10068: "Unknown Guild Member Verification Form",
  10069: "Unknown Guild Welcome Screen",
  10070: "Unknown Guild Scheduled Event",
  10071: "Unknown Guild Scheduled Event User",
  10087: "Unknown Tag",

  // Permission errors
  50001: "Missing access",
  50002: "Invalid account type",
  50003: "Cannot execute action on a DM channel",
  50004: "Guild widget disabled",
  50005: "Cannot edit a message authored by another user",
  50006: "Cannot send an empty message",
  50007: "Cannot send messages to this user",
  50008: "Cannot send messages in a non-text channel",
  50009: "Channel verification level is too high",
  50010: "OAuth2 application does not have a bot",
  50011: "OAuth2 application limit reached",
  50012: "Invalid OAuth2 state",
  50013: "Missing permissions",
  50014: "Invalid authentication token",
  50015: "Note is too long",
  50016: "Provided too few or too many messages to delete",
  50017: "Invalid MFA level",
  50019: "A message can only be pinned to the channel it was sent in",
  50020: "Invite code was either invalid or taken",
  50021: "Cannot execute action on a system message",
  50024: "Cannot execute action on this channel type",
  50025: "Invalid OAuth2 access token",
  50026: "Missing required OAuth2 scope",
  50027: "Invalid webhook token",
  50028: "Invalid role",
  50033: "Invalid Recipient(s)",
  50034: "A message provided was too old to bulk delete",
  50035: "Invalid form body",
  50036: "An invite was accepted to a guild the application's bot is not in",
  50041: "Invalid API version",
  50045: "File uploaded exceeds the maximum size",
  50046: "Invalid file uploaded",
  50054: "Cannot self-redeem this gift",
  50055: "Invalid Guild",
  50068: "Invalid message flags",
  50070: "Payment source required to redeem gift",
  50074: "Cannot delete a channel required for Community guilds",
  50081: "Invalid sticker sent",
  50083: "Tried to perform an operation on an archived thread",
  50084: "Invalid thread notification settings",
  50085: "Before value is earlier than the thread creation date",
  50086: "Community server channels must be text channels",
  50095: "This server is not available in your location",
  50097: "This server needs monetization enabled",
  50101: "This server needs more boosts to use this feature",
  50109: "The user has already purchased this SKU",
  50132: "Ownership cannot be transferred to a bot user",
  50138: "Failed to resize asset below the maximum size",
  50146: "Uploaded file not found",
  50600: "You do not have permission to send this sticker",

  // Rate limit errors
  90001: "Reaction blocked",
  90002: "Rate limited",
  130000: "Resource overloaded",
  150006: "The Stage is already open",
  160002: "Allowed mentions validation failed",
  160004: "A message with this content has already been sent",
  170001: "Cannot update a finished event",
  170002: "Failed to create stage needed for stage event",
  180000: "Cannot reply without permission to read message history",

  // Interaction errors
  40001:
    "Unauthorized. This error is returned when the Authorization header is missing, invalid, or revoked",
  40002: "Missing Bot Authorization",
  40003:
    "Unauthorized. This error is returned when the user attempts to access a resource they do not have permission to access",
  40005: "Request entity too large",
  40006: "Feature temporarily disabled server-side",
  40007: "The user is banned from this guild",
  40032: "Target user is not connected to voice",
  40033: "This message has already been crossposted",
  40041: "An application command with that name already exists",
  40042: "ApplicationNotFoundException",
  40043: "Application interaction failed to send",
  40060: "Interaction has already been acknowledged",
  40061: "Tag names must be unique",
};

/**
 * Get a human-readable error message for a Discord API error code
 * @param {number} code - The Discord API error code
 * @param {boolean} includeCode - Whether to include the error code in the message
 * @returns {string} The error message
 */
function getDiscordErrorMessage(code, includeCode = true) {
  const message = ERROR_CODES[code] || "Unknown Discord error";
  return includeCode ? `Error ${code}: ${message}` : message;
}

/**
 * Get category of the error based on code
 * @param {number} code - The Discord API error code
 * @returns {string} The category of the error
 */
function getErrorCategory(code) {
  if (code >= 10000 && code < 50000) return "RESOURCE_ERROR";
  if (code >= 50000 && code < 90000) return "PERMISSION_ERROR";
  if (code >= 90000 && code < 100000) return "RATE_LIMIT_ERROR";
  if (code >= 130000 && code < 140000) return "RESOURCE_OVERLOADED";
  if (code >= 150000 && code < 160000) return "STAGE_ERROR";
  if (code >= 160000 && code < 170000) return "MESSAGE_ERROR";
  if (code >= 170000 && code < 180000) return "EVENT_ERROR";
  if (code >= 180000 && code < 190000) return "HISTORY_ERROR";
  if (code >= 40000 && code < 50000) return "INTERACTION_ERROR";
  return "UNKNOWN_CATEGORY";
}

/**
 * Get stack trace info to identify the source of the error
 * @param {Error} error - The error object
 * @returns {Object} Object containing file path and interaction info
 */
function getErrorSource(error, interaction) {
  // Extract file path from error stack
  const stackLines = error.stack?.split("\n") || [];
  let filePath = "unknown location";

  // Look for project files in the stack trace using a more flexible approach
  for (const line of stackLines) {
    // Ignore node_modules paths
    if (line.includes("node_modules")) continue;

    // Try to find src/ directory references which likely indicate our project files
    const srcMatch = line.match(/\/(src\/[^:]+):/);
    if (srcMatch && srcMatch[1]) {
      filePath = srcMatch[1];
      break;
    }

    // As a fallback, just extract any filename.js pattern if we didn't find a src/ folder
    const fileMatch = line.match(/\/([^\/]+\.js):/);
    if (fileMatch && fileMatch[1]) {
      filePath = fileMatch[1];
      break;
    }
  }

  // Determine interaction type and identifier
  let interactionType = "unknown";
  let interactionId = "unknown";

  if (!interaction) return { filePath, interactionType, interactionId };

  if (interaction.isChatInputCommand?.()) {
    interactionType = "command";
    interactionId = interaction.commandName;
  } else if (interaction.isButton?.()) {
    interactionType = "button";
    interactionId = interaction.customId;
  } else if (interaction.isStringSelectMenu?.()) {
    interactionType = "select menu";
    interactionId = interaction.customId;
  } else if (interaction.isModalSubmit?.()) {
    interactionType = "modal";
    interactionId = interaction.customId;
  }

  return { filePath, interactionType, interactionId };
}

module.exports = {
  ERROR_CODES,
  getDiscordErrorMessage,
  getErrorCategory,
  getErrorSource,
};
