const { EmbedBuilder, MessageEmbed, ApplicationCommandType } = require("discord.js");

module.exports = {
  name: "quiz",
  run: async (client, interaction) => {
    let embed;

    // if the same person responds, not anyone else in the server
    if (interaction.user.id === interaction.message.interaction.user.id) {
      if (interaction.customId === "TRUE") {
        embed = new EmbedBuilder()
          .setTitle("Quiz Answer")
          .setDescription("The Answer given by you was correct! Points++ !")
          .setColor("#ffffff")
          .setTimestamp()
          .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
      } else {
        embed = new EmbedBuilder()
          .setTitle("Quiz Answer")
          .setDescription("The Answer given is wrong. 😢")
          .setColor("#ffffff")
          .setTimestamp()
          .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
      }
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
