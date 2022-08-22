const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "meme",
  description: "free memes",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction, options) => {
    await interaction.deferReply();
    const imageBuf = await fetch(
      `https://frenchnoodles.xyz/api/endpoints/randommeme`
    );
    const image = await imageBuf.buffer();

    const attachment = new AttachmentBuilder(image, {
      name: "meme.png",
    });
    await interaction.editReply({
      content: `${interaction.user} here is you meme`,
      files: [attachment],
    });
  },
};
