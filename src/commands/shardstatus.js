const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { colorize } = require("../assets/colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shardstatus")
    .setDescription("Displays status information for all shards"),

  enabled: true,
  guildOnly: true,
  requirements: {
    database: false,
  },

  async execute(interaction) {
    // always get client from interaction to avoid parameter issues
    const client = interaction.client;

    await interaction.deferReply();

    try {
      // Check if we're running in sharded mode
      const isSharded = !!client.shard;

      if (!isSharded) {
        return interaction.editReply("Bot is running in unsharded mode.");
      }

      // Get total shard count
      const totalShards = client.shard.count;

      // Create main embed
      const mainEmbed = new EmbedBuilder()
        .setTitle("📊 Shard Status Monitor")
        .setColor(0x00ae86)
        .setDescription(`Monitoring ${totalShards} shards`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.tag}` });

      try {
        // Collect data from all shards
        const shardData = await client.shard.broadcastEval((c) => {
          return {
            id: c.shard?.ids?.[0] ?? "Unknown",
            status: c.ws.status, // 0 = Connected, other values indicate issues
            ping: c.ws.ping,
            uptime: c.uptime,
            serverCount: c.guilds.cache.size,
            memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
            ready: c.ws.status === 0, // 0 = Connected to websocket
          };
        });

        // Add summary info to main embed
        const readyShards = shardData.filter((s) => s.ready).length;
        const totalServers = shardData.reduce(
          (acc, s) => acc + s.serverCount,
          0
        );
        const totalMemory = shardData
          .reduce((acc, s) => acc + parseFloat(s.memory), 0)
          .toFixed(2);

        mainEmbed.addFields(
          {
            name: "Shards Ready",
            value: `${readyShards}/${totalShards}`,
            inline: true,
          },
          { name: "Total Servers", value: `${totalServers}`, inline: true },
          { name: "Total Memory", value: `${totalMemory} MB`, inline: true }
        );

        // Create individual shard status sections
        const statusEmojis = {
          connected: "🟢",
          connecting: "🟡",
          disconnected: "🔴",
          unknown: "⚪",
        };

        // Function to get status emoji
        const getStatusEmoji = (status) => {
          if (status === 0) return statusEmojis.connected;
          if (status === 1 || status === 2) return statusEmojis.connecting;
          if (status === 3 || status === 4) return statusEmojis.disconnected;
          return statusEmojis.unknown;
        };

        // Function to format uptime
        const formatUptime = (ms) => {
          if (!ms) return "Unknown";

          const seconds = Math.floor((ms / 1000) % 60);
          const minutes = Math.floor((ms / (1000 * 60)) % 60);
          const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
          const days = Math.floor(ms / (1000 * 60 * 60 * 24));

          const parts = [];
          if (days > 0) parts.push(`${days}d`);
          if (hours > 0) parts.push(`${hours}h`);
          if (minutes > 0) parts.push(`${minutes}m`);
          if (seconds > 0) parts.push(`${seconds}s`);

          return parts.join(" ") || "0s";
        };

        // Group detailed info by batches of 6 shards (to avoid embed field limit)
        const chunks = [];
        for (let i = 0; i < shardData.length; i += 6) {
          chunks.push(shardData.slice(i, i + 6));
        }

        // Add field for each chunk of shards
        chunks.forEach((chunk, chunkIndex) => {
          let shardInfo = "";

          chunk.forEach((shard) => {
            const statusEmoji = getStatusEmoji(shard.status);
            shardInfo += `${statusEmoji} **Shard #${shard.id}**\n`;
            shardInfo += `└ Servers: ${shard.serverCount} | `;
            shardInfo += `Ping: ${shard.ping}ms | `;
            shardInfo += `Memory: ${shard.memory}MB | `;
            shardInfo += `Uptime: ${formatUptime(shard.uptime)}\n\n`;
          });

          mainEmbed.addFields({
            name: `Shard Details (Group ${chunkIndex + 1})`,
            value: shardInfo || "No data available",
          });
        });

        // Add legend
        mainEmbed.addFields({
          name: "Status Legend",
          value: `${statusEmojis.connected} Connected  ${statusEmojis.connecting} Connecting  ${statusEmojis.disconnected} Disconnected  ${statusEmojis.unknown} Unknown`,
          inline: false,
        });

        await interaction.editReply({ embeds: [mainEmbed] });
      } catch (error) {
        console.error(
          `${colorize().red}[commands] ${
            colorize().white
          }Error fetching shard data:${colorize().reset}`,
          error
        );
        return interaction.editReply({
          content: "Failed to fetch data from some shards. Try again later.",
          embeds: [mainEmbed],
        });
      }
    } catch (error) {
      console.error(
        `${colorize().red}[commands] ${
          colorize().white
        }Error in shardstatus command:${colorize().reset}`,
        error
      );

      if (interaction.deferred) {
        await interaction.editReply(
          "An error occurred while fetching shard status information."
        );
      } else {
        await interaction.reply({
          content: "An error occurred while fetching shard status information.",
          ephemeral: true,
        });
      }
    }
  },
};
