const { EmbedBuilder, ApplicationCommandType } = require("discord.js");

const PointsModel = require("../../mongoose/schema/PointsModel");

module.exports = {
  name: "quizleaderboard",
  description: "Quiz Leaderboard",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    let embed;

    // fetch every entry in db
    const userPoints = await PointsModel.find({});
    if (userPoints.length) {
      // Add only <= 10
      const descendingUserPoints = userPoints.sort((a, b) => b.points - a.points).slice(0, 10);
      embed = new EmbedBuilder()
        .setTitle("Quiz LeaderBoard")
        .setFields(
          ...descendingUserPoints.map((pointObj) => {
            return {
              name: `<@${pointObj.id}>`, //TODO: Get the username or mention them
              value: pointObj.points.toString(),
            };
          })
        )
        .setColor("#ffffff")
        .setTimestamp()
        .setFooter({
          text: `Requested by: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
    } else {
      embed = new EmbedBuilder()
        .setTitle("Quiz LeaderBoard")
        .setFields({ name: "Empty", value: "The leaderboard is currently empty" })
        .setColor("#ffffff")
        .setTimestamp()
        .setFooter({
          text: `Requested by: ${interaction.user.username}`,
          iconURL: interaction.user.displayAvatarURL(),
        });
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};
