const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "fortune",
  description: "Get a fortune cookie.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
        name: "question",
        description: "The question you want to ask the fortune cookie.",
        type: 3,
        required: true
    }
  ],
  cooldown: 3000,
  run: async (client, interaction) => {
    const fortune = await fetch(
      `https://raw.githubusercontent.com/losier/Kiri/master/Data/MediaData/fortune.json`
    ).then((res) => res.json());

    const newFortune = fortune[Math.floor(Math.random() * fortune.length)];

    const question = interaction.options.get("question").value;

    const embed = new EmbedBuilder()
      .setTitle("Fortune")
      .setDescription(`Your question\n*${question}*\nMy answer :\n`)
      .setColor("#ffffff")
      .setImage(newFortune)
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
