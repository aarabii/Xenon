const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "fuse",
  description: "fuse two images",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user1",
      description: "The fused user 1",
      type: 6,
      required: true,
    },
    {
      name: "user2",
      description: "The fused user 2",
      type: 6,
      required: false,
    },
  ],
  run: async (client, interaction, options) => {
    await interaction.deferReply();
    const user1 = interaction.options.getUser("user1");
    const user2 = interaction.options.getUser("user2") || interaction.member;
    const avatar1 = user1.displayAvatarURL({
      format: "png",
    });
    const avatar2 = user2.displayAvatarURL({
      format: "png",
    });
    const image = await Canvas.fuse(avatar1, avatar2);
    const attachment = new AttachmentBuilder(image, {
      name: "fuse.png",
    });

    await interaction.editReply({
      content: `${user1} got fused by ${user2}!`,
      files: [attachment],
    });
  },
};
