const { EmbedBuilder, WebhookClient } = require("discord.js");
const client = require("..");

const CHANNEL = client.channels.cache.get("1010558786592849950");

client.on("shardError", (error) => {
  const embed = new EmbedBuilder()
    .setTitle("Shard Error")
    .setDescription(`\`\`\`\n${error}\n\`\`\``)
    .setColor("#ff0000")
    .setTimestamp()
    .setFooter("Shard Error");

  CHANNEL.send({ embeds: [embed] });
});

process.on("unhandledRejection", (error) => {
  const embed = new EmbedBuilder()
    .setTitle("Unhandled Rejection")
    .setDescription(`\`\`\`\n${error}\n\`\`\``)
    .setColor("#ff0000")
    .setTimestamp()
    .setFooter("Unhandled Rejection");

  CHANNEL.send({ embeds: [embed] });
  console.error("Unhandled promise rejection:", error);
});
