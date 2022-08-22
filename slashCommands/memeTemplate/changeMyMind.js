const {
    AttachmentBuilder,
    ApplicationCommandType,
  } = require("discord.js");
  const { Canvas } = require("canvacord");
  
  module.exports = {
    name: "change-my-mind",
    description: "Change my mind",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
        name: "text",
        description: "change my mind text",
        type: 3,
        required: true,
      },
      {
        name: "user",
        description: "user who claims to change their mind",
        type: 6,
        required: false,
      }
    ],
    run: async (client, interaction, options) => {
      await interaction.deferReply();
        const text = interaction.options.getString("text");
    const user = interaction.options.getUser("user") || interaction.member;

      const image = await Canvas.changemymind(text);
      const attachment = new AttachmentBuilder(image, {
        name: "changeMyMind.png",
      });
  
      await interaction.editReply({
        content: `Change ${user}'s Mind`,
        files: [attachment],
      });
    },
  };
  