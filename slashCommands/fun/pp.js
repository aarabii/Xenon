const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "pp-rate",
  description: "Check pp",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user",
      description: "The user to affect",
      type: 6,
      required: false,
    },
  ],
  run: async (client, interaction, options) => {
    await interaction.deferReply();
    const Member = interaction.options.getUser("user") || interaction.member;

    const ppSize = [
      "=",
      "==",
      "===",
      "====",
      "=====",
      "======",
      "=======",
      "========",
      "=========",
      "==========",
    ];

    const pp = ppSize[Math.floor(Math.random() * ppSize.length)];
    const ppEmoji = "<:peepeekun:867300916734459904>";

    const embed = new EmbedBuilder()
      .setTitle(`**${ppEmoji} Pee-Pee Machine**`)
      .setColor("#ffffff")
      .setDescription(
        `${Member}'s pp \n **${pp}8** ${ppEmoji}`
      )
      .setThumbnail(Member.displayAvatarURL());

    await interaction.editReply({
      content: `${Member}'s PP size`,
      embeds: [embed],
    });
  },
};
