const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "ping",
  description: "Check bot's ping.",
  cooldown: 3000,
  userPerms: [],
  botPerms: [],
  run: async (client, message, args) => {
    const image = [
      "https://cdn.discordapp.com/attachments/892794857905602560/892794900863660062/63e1657a8a6249a2fc9c062b17f27ce0.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795017104613376/dc87c9ea90b4b7d02a0cbe5de256d385.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795143093108806/a665463e60ef772c82286e4ee6a15353.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795222986207293/4a3a4f44524556704c29879feeba0c23.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795292573913098/534d38d35eb761ad11e43fe378c3de29.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795346172928080/c17166b2af1a743b149e1eb0f3203db4.gif",
      "https://cdn.discordapp.com/attachments/892794857905602560/892795432797872188/6619fe492c713eb3051ab7568181dbdd.gif",
    ];

    const Loading =
      "https://cdn.discordapp.com/attachments/890100498508697620/892787033083346944/a5a8318c9abc50a09f836028a41c6985.gif";
    const Ping = client.ws.ping;
    const Runtime = moment(client.uptime).format("LTS");
    const Images = image[Math.floor(Math.random() * image.length)];

    let Color;
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

    message
      .reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("🏓 Pong")
            .setDescription("***Loading Data...***")
            .setThumbnail(Loading)
            .setColor("#ffffff"),
        ],
      })
      .then((m) => {
        setTimeout(() => {
          m.edit({
            embeds: [
              new EmbedBuilder()
                .setTitle("🏓 Pong")
                .setColor(Color)
                .addFields(
                  {
                    name: "Websocket heartbeat",
                    value: `\`\`\`yaml\n${Ping} Ms\`\`\``,
                    inline: true,
                  },
                  {
                    name: "Roundtrip latency",
                    value: `\`\`\`yaml\n${
                      m.createdTimestamp - message.createdTimestamp
                    } Ms\`\`\``,
                    inline: true,
                  },
                  {
                    name: "Run-Time",
                    value: `\`\`\`yaml\n${Runtime} UTC\`\`\``,
                    inline: true,
                  }
                )
                .setTimestamp()
                .setThumbnail(Images),
            ],
          });
        }, 1000);
      });
  },
};
