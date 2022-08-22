const {
    AttachmentBuilder,
    ApplicationCommandType,
  } = require("discord.js");
  const { Canvas } = require("canvacord");
  
  module.exports = {
    name: "cylde",
    description: "cylde",
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

      const image = await Canvas.clyde(text);
      const attachment = new AttachmentBuilder(image, {
        name: "cylde.png",
      });
  
      await interaction.editReply({
        content: `${user} recived a message from cylde`,
        files: [attachment],
      });
    },
  };
  