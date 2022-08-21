const { EmbedBuilder, MessageEmbed, ApplicationCommandType } = require("discord.js");

module.exports = {
  name: "quiz",
  run: async (client, interaction) => {
    let embed;

    // if the same person responds, not anyone else in the server
    if (interaction.user.id === interaction.message.interaction.user.id) {
      embed = new EmbedBuilder()
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
    }
  },
};
