const { EmbedBuilder, MessageEmbed, ApplicationCommandType } = require("discord.js");

module.exports = {
  name: "quiz",
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Quiz Response")
      .setDescription(`Option chosen was ${interaction.customId}`)
      .setColor("#ffffff")
      .setTimestamp()
      .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

    // Remove the components from the message after response
    interaction
      .update({
        embeds: [embed],
        components: [],
      })
      .catch(console.error);
  },
};
