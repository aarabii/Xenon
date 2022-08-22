const {
    EmbedBuilder,
    ApplicationCommandType,
  } = require("discord.js");
  const { Canvas } = require("canvacord");
  
  module.exports = {
    name: "gayrate",
    description: "Check how much you are gay.",
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
      const Member = interaction.options.getUser("user") || interaction.member;
      
      const gayRate = Math.floor(Math.random() * 101);

      const embed = new EmbedBuilder()
        .setTitle('**🌈 Gay-Rate Machine**')
        .setColor('#ffffff')
        .setDescription(`${Member}, You are **${gayRate}%** gay 🌈`)
        .setThumbnail(Member.displayAvatarURL())

    await interaction.editReply({
        content: `${Member}'s Gay percentage`,
        embeds: [embed]
    })

    },
  };
  