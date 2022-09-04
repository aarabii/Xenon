const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const moment = require('moment');
const pingImageArr = require('../../data/MediaData/ping.json')

module.exports = {
  name: "ping",
  description: "Check bot's ping.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    
    const pingThumbnail = pingImageArr[Math.floor(Math.random() * pingImageArr.length)];
    const Loading = "https://cdn.discordapp.com/attachments/890100498508697620/892787033083346944/a5a8318c9abc50a09f836028a41c6985.gif";
    
    const Ping = client.ws.ping;
    const Runtime = moment(client.uptime).format('d[d] h[h] m[m] s[s]');

    var Color;
    if (Ping <= 300) {
      Color = "#00ff00";
    }
    if (Ping > 300 && Ping < 600) {
      Color = "#ffff00";
    }
    if (Ping >= 600 && Ping < 900) {
      Color = "#ffa500";
    }
    if (Ping >= 900) {
      Color = "#ff0000";
    }

    const loadingEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong')
      .setDescription('***Loading Data...***')
      .setThumbnail(Loading)
      .setColor('#ffffff');

    const pingEmbed = new EmbedBuilder()
      .setTitle('🏓 Pong')
      .setColor(Color)
      .addFields(
        {
          name: 'Websocket heartbeat',
          value: `\`\`\`yaml\n${Ping} Ms\`\`\``,
          inline: true
        },
        {
          name: 'Roundtrip latency',
          value: `\`\`\`yaml\n${Math.abs(interaction.createdTimestamp - Date.now())} Ms\`\`\``,
          inline: true
        },
        {
          name: 'API Latency',
          value: `\`\`\`yaml\n${Math.round(client.ws.ping)} Ms\`\`\``,
          inline: true
        },
        {
          name: 'Runtime',
          value: `\`\`\`yaml\n${Runtime}\`\`\``,
          inline: true
        },
        {
          name: 'Uptime',
          value: `\`\`\`yaml\n${moment.duration(client.uptime).format('d[d] h[h] m[m] s[s]')}\`\`\``,
          inline: true
        },
        {
          name: 'Memory Usage',
          value: `\`\`\`yaml\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``,
          inline: true
        },
      )

    interaction.reply({
      embeds: [loadingEmbed],
    }).then(() => {
      setTimeout(() => {
        interaction.editReply({
          embeds: [pingEmbed],
        });
      }, 1000);
    })
  },
};
