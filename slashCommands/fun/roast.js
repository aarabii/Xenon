const {
    EmbedBuilder,
    ApplicationCommandType,
  } = require("discord.js");
const fetch = require("node-fetch");
  
  module.exports = {
    name: "roast",
    description: "roast a user",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
      {
        name: "user",
        description: "Roast a user",
        type: 6,
        required: true,
      },
    ],
    run: async (client, interaction, options) => {
      await interaction.deferReply();
      const user = interaction.options.getUser("user");
    const roastText = await fetch('https://insult.mattbas.org/api/en/insult.json').then(res => res.json());
    const roast = roastText.insult;
        const embed = new EmbedBuilder()
        .setTitle("ROASTED")
        .setDescription(`\`\`\`yaml\n${roast}\`\`\``)
        .setColor("#ff0000")
        .setFooter({
            text: `Roasted by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
        })
        .setTimestamp()

        await interaction.editReply({
            content: `${user} is roasted by ${interaction.user.username}`,
            embeds: [embed],
        })

    },
  };
  