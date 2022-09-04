const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const dareTextColl = require("../../data/textData/Dare.json");

module.exports = {
  name: "dare",
  description: "Dare your friends",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user",
      description: "The user to dare",
      type: 6,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.guild.members.cache.get(
      interaction.options.get("user").value
    );
    const dareText =
      dareTextColl[Math.floor(Math.random() * dareTextColl.length)];

    const embed = new EmbedBuilder()
      .setTitle("Dare")
      .setDescription(`Hey ${member},\n\n*${dareText}*`)
      .setColor("#ffffff")
      .setThumbnail(
        "https://media.tenor.com/images/3408860a5f846d39283b01e5d6b5712d/tenor.gif"
      )
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
      content: `${member}`,
    });
  },
};
