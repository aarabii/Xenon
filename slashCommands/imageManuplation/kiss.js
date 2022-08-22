const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "kiss",
  description: "kiss a user",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user1",
      description: "The user to kiss",
      type: 6,
      required: true,
    },
    {
      name: "user2",
      description: "The user get kissed",
      type: 6,
      required: false,
    },
  ],
  run: async (client, interaction, options) => {
    await interaction.deferReply();
    const user1 = interaction.options.getUser("user1") || interaction.member;
    const user2 = interaction.options.getUser("user2") || interaction.member;
    const avatar1 = user1.displayAvatarURL({
      format: "png",
    });
    const avatar2 = user2.displayAvatarURL({
      format: "png",
    });
    const image = await Canvas.kiss(avatar1, avatar2);
    const attachment = new AttachmentBuilder(image, {
      name: "kiss.png",
    });

    await interaction.editReply({
      content: `${user1} is kissed by ${user2}!`,
      files: [attachment],
    });
  },
};
