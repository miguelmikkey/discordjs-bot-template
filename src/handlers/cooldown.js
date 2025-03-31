const { Collection } = require("discord.js");

// Initialize cooldowns collection
const cooldowns = new Collection();

/**
 * Checks if a user is on cooldown for a command
 * @param {Object} command The command object
 * @param {string} userId The user's ID
 * @returns {Object} Contains onCooldown status and timeLeft if on cooldown
 */
function handleCooldown(command, userId) {
  // If no cooldown is set, allow command
  if (!command.cooldown) return { onCooldown: false };

  // Get the collection for this command
  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const cooldownAmount = command.cooldown * 1000; // Convert to milliseconds

  // Check if user is on cooldown
  if (timestamps.has(userId)) {
    const expirationTime = timestamps.get(userId) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return {
        onCooldown: true,
        timeLeft: timeLeft.toFixed(1),
      };
    }
  }

  // Set the cooldown
  timestamps.set(userId, now);
  setTimeout(() => timestamps.delete(userId), cooldownAmount);

  return { onCooldown: false };
}

module.exports = { handleCooldown };
