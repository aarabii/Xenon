const {
  AttachmentBuilder,
  EmbedBuilder,
  ApplicationCommandType,
} = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "affect",
  description: "Affects a user",
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
    const user = interaction.options.getUser("user") || interaction.member;
    const avatar = user.displayAvatarURL({
      format: "png",
    });
    const image = await Canvas.affect(avatar);
    const attachment = new AttachmentBuilder(image, {
      name: "affect.png",
    });

    await interaction.editReply({
      content: `${user} is affected!`,
      files: [attachment],
    });
  },
};
