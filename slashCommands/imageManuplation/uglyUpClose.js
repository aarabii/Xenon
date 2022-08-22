const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "ugly-up-close",
  description: "Close as ugly",
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

    const imageBuf = await fetch(
      `https://frenchnoodles.xyz/api/endpoints/uglyupclose/?image=${avatar}`
    );
    const image = await imageBuf.buffer();

    const attachment = new AttachmentBuilder(image, {
      name: "ugly-up-close.png",
    });
    await interaction.editReply({
      content: `${user} is ugly up close.`,
      files: [attachment],
    });
  },
};
