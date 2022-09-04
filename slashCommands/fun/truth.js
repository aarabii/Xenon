const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const truthTextColl = require("../../data/textData/truth.json");

module.exports = {
  name: "truth",
  description: "give truth to your friends",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user",
      description: "The user to say truth",
      type: 6,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.guild.members.cache.get(
      interaction.options.get("user").value
    );
    const truthText =
      truthTextColl[Math.floor(Math.random() * truthTextColl.length)];

    const embed = new EmbedBuilder()
      .setTitle("Truth")
      .setDescription(`Hey ${member},\n\n*${truthText}*`)
      .setColor("#ffffff")
      .setThumbnail(
        "https://media.tenor.com/images/b2f04c9d19c4378840741fcdcd41fc5f/tenor.gif"
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
