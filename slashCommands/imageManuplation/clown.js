const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "clown",
  description: "clown",
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
      `https://frenchnoodles.xyz/api/endpoints/clown/?image=${avatar}`
    );
    const image = await imageBuf.buffer();

    const attachment = new AttachmentBuilder(image, {
      name: "clown.png",
    });
    await interaction.editReply({
      content: `${user} is a clown.`,
      files: [attachment],
    });
  },
};
