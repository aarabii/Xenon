const { EmbedBuilder } = require("discord.js");
const PointsModel = require("../mongoose/schema/PointsModel");

async function saveToDB(playerPoint) {
  await playerPoint.save();
}

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

        const userPointsForUser = await PointsModel.findOne({ id: interaction.user.id }).exec();

        if (!userPointsForUser) {
          // if user not present already
          const playerPoint = new PointsModel({ id: interaction.user.id, points: 5 });
          await saveToDB(playerPoint);
        } else {
          // update the one found
          const points = userPointsForUser.points;
          await PointsModel.findOneAndUpdate({ id: interaction.user.id }, { $set: { points: points + 5 } });
        }
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
