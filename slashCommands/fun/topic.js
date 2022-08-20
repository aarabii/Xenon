const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "topic",
  description: "Topic to chat",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    const topic = await fetch(
      `https://raw.githubusercontent.com/losier/Kiri/master/Data/TextData/Topic.json`
    ).then((res) => res.json());

    const newTopic = topic[Math.floor(Math.random() * topic.length)];

    const embed = new EmbedBuilder()
      .setTitle("Topic")
      .setDescription(newTopic)
      .setColor("#ffffff")
      .setTimestamp()
      .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    const wait = require("node:timers/promises").setTimeout;

    await interaction.deferReply();
    await wait(100);
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
