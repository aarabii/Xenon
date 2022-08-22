const {
    AttachmentBuilder,
    ApplicationCommandType,
  } = require("discord.js");
  const { Canvas } = require("canvacord");
  
  module.exports = {
    name: "burn",
    description: "Burn a user",
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
      const image = await Canvas.burn(avatar, 5);
      const attachment = new AttachmentBuilder(image, {
        name: "burn.png",
      });
  
      await interaction.editReply({
        content: `${user} is burning!`,
        files: [attachment],
      });
    },
  };
  