const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const os = require("os");
const { colorize } = require("../assets/colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sysinfo")
    .setDescription("Displays system information about the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only admins can use it

  enabled: true,
  guildOnly: true, // Make it only available in your development server
  requirements: {
    database: false, // No database needed for this command
  },

  async execute(interaction, client) {
    await interaction.deferReply();

    try {
      // Check if we're running in sharded mode
      const isSharded = !!client.shard;

      // FIXED: Much more defensive shard ID retrieval
      let currentShardId = "N/A";
      if (isSharded) {
        // Safely explore what properties are available
        const shardProps = Object.keys(client.shard).join(", ");
        console.log(`Available shard properties: ${shardProps}`);

        // Try multiple ways to get shard ID
        if (
          client.shard.ids &&
          Array.isArray(client.shard.ids) &&
          client.shard.ids.length > 0
        ) {
          currentShardId = client.shard.ids[0];
        } else if (typeof client.shard.id !== "undefined") {
          currentShardId = client.shard.id;
        } else if (client.shard.shardId !== undefined) {
          currentShardId = client.shard.shardId;
        } else {
          currentShardId = "Unknown";
        }
      }

      // Get data from this shard
      const currentShardServerCount = client.guilds.cache.size;
      const currentShardMemoryUsage = (
        process.memoryUsage().heapUsed /
        1024 /
        1024
      ).toFixed(2);

      // Get bot uptime
      const uptime = formatUptime(client.uptime);

      // Build local stats that don't require cross-shard communication
      const stats = {
        shard: {
          id: currentShardId,
          servers: currentShardServerCount,
          memory: `${currentShardMemoryUsage} MB`,
          uptime: uptime,
        },
        system: {
          platform: `${os.type()} (${os.platform()})`,
          architecture: os.arch(),
          cpus: os.cpus().length,
          totalMemory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
          freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
          nodeVersion: process.version,
        },
      };

      // Cross-shard data collection (only if in sharded mode)
      if (isSharded) {
        try {
          // Get shard count safely
          stats.totalShards = client.shard.count || 1;

          // Get total server count across all shards
          const guildCounts = await client.shard.fetchClientValues(
            "guilds.cache.size"
          );
          stats.totalServers = guildCounts.reduce(
            (acc, count) => acc + count,
            0
          );

          // FIXED: More defensive broadcastEval
          const memoryUsages = await client.shard.broadcastEval((c) => {
            // Create a safe object that doesn't rely on c.shard structure
            return {
              // Try multiple ways to get shardId
              shardId: c.shard
                ? Array.isArray(c.shard.ids) && c.shard.ids.length > 0
                  ? c.shard.ids[0]
                  : c.shard.id !== undefined
                  ? c.shard.id
                  : "Unknown"
                : "Unknown",
              heapUsed: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                2
              ),
              rss: (process.memoryUsage().rss / 1024 / 1024).toFixed(2),
            };
          });

          stats.shards = memoryUsages;

          // Calculate total memory usage
          stats.totalMemoryUsage =
            memoryUsages
              .reduce((acc, shard) => acc + parseFloat(shard.heapUsed), 0)
              .toFixed(2) + " MB";
        } catch (error) {
          console.error(
            `${colorize().red}[commands] ${
              colorize().white
            }Error fetching cross-shard data:${colorize().reset}`,
            error
          );
          stats.crossShardError = "Failed to fetch data from other shards.";
        }
      }

      // Create a rich embed with the system information
      const embed = new EmbedBuilder()
        .setTitle("🖥️ System Information")
        .setColor(0x3498db)
        .setDescription(`Bot system information and statistics`)
        .addFields(
          { name: "Status", value: "```Online```", inline: true },
          { name: "Uptime", value: `\`\`\`${uptime}\`\`\``, inline: true },
          {
            name: "Latency",
            value: `\`\`\`${client.ws.ping}ms\`\`\``,
            inline: true,
          }
        );

      // Add shard information
      if (isSharded) {
        embed.addFields(
          {
            name: "Sharding",
            value: `\`\`\`Enabled (${stats.totalShards} shards)\`\`\``,
            inline: true,
          },
          {
            name: "Current Shard",
            value: `\`\`\`#${currentShardId}\`\`\``,
            inline: true,
          },
          {
            name: "Total Servers",
            value: `\`\`\`${stats.totalServers}\`\`\``,
            inline: true,
          },
          {
            name: "Total Memory Usage",
            value: `\`\`\`${stats.totalMemoryUsage}\`\`\``,
            inline: true,
          }
        );

        // Add individual shard details
        let shardDetails = "";
        stats.shards.forEach((shard) => {
          shardDetails += `Shard #${shard.shardId}: ${shard.heapUsed} MB\n`;
        });
        embed.addFields({
          name: "Shard Memory Usage",
          value: `\`\`\`${shardDetails}\`\`\``,
        });
      } else {
        embed.addFields(
          { name: "Sharding", value: "```Disabled```", inline: true },
          {
            name: "Servers",
            value: `\`\`\`${currentShardServerCount}\`\`\``,
            inline: true,
          },
          {
            name: "Memory Usage",
            value: `\`\`\`${currentShardMemoryUsage} MB\`\`\``,
            inline: true,
          }
        );
      }

      // Add system information
      embed.addFields(
        {
          name: "Platform",
          value: `\`\`\`${stats.system.platform}\`\`\``,
          inline: true,
        },
        {
          name: "Architecture",
          value: `\`\`\`${stats.system.architecture}\`\`\``,
          inline: true,
        },
        {
          name: "CPU Cores",
          value: `\`\`\`${stats.system.cpus}\`\`\``,
          inline: true,
        },
        {
          name: "Node.js Version",
          value: `\`\`\`${stats.system.nodeVersion}\`\`\``,
          inline: true,
        },
        {
          name: "Total System Memory",
          value: `\`\`\`${stats.system.totalMemory}\`\`\``,
          inline: true,
        },
        {
          name: "Free System Memory",
          value: `\`\`\`${stats.system.freeMemory}\`\`\``,
          inline: true,
        }
      );

      // Add timestamp to the footer
      embed.setFooter({
        text: `Requested by ${interaction.user.tag}`,
      });
      embed.setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(
        `${colorize().red}[commands] ${
          colorize().white
        }Error in sysinfo command:${colorize().reset}`,
        error
      );

      // If we've already sent a deferred reply, edit it with the error
      if (interaction.deferred) {
        await interaction.editReply({
          content: "An error occurred while fetching system information.",
          embeds: [],
        });
      } else {
        await interaction.reply({
          content: "An error occurred while fetching system information.",
          ephemeral: true,
        });
      }
    }
  },
};

// Helper function to format uptime
function formatUptime(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (hours > 0) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds === 1 ? "" : "s"}`);

  return parts.join(", ");
}
