const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "spank",
  description: "spank a user",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user1",
      description: "The user to get spanked",
      type: 6,
      required: true,
    },
    {
      name: "user2",
      description: "who is spanking",
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
    const image = await Canvas.spank(avatar2, avatar1);
    const attachment = new AttachmentBuilder(image, {
      name: "spank.png",
    });

    await interaction.editReply({
      content: `${user2} spanked ${user1}!`,
      files: [attachment],
    });
  },
};
