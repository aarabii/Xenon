const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "opinion",
  description: "make an opinion",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "text",
      description: "Oh-no text",
      type: 3,
      required: true,
    },
    {
      name: "user",
      description: "user who claims to change their mind",
      type: 6,
      required: false,
    },
  ],
  run: async (client, interaction, options) => {
    await interaction.deferReply();
    const text = interaction.options.getString("text");
    const user = interaction.options.getUser("user") || interaction.member;
    const avatar = user.displayAvatarURL({
      format: "png",
    });
    const image = await Canvas.opinion(avatar, text);
    const attachment = new AttachmentBuilder(image, {
      name: "opinion.png",
    });

    await interaction.editReply({
      content: `${user}'s opinion`,
      files: [attachment],
    });
  },
};
