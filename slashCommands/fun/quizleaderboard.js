const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

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

      const leaderboardPoints = await Promise.all(
        descendingUserPoints.map(async (ptObj) => {
          const response = await fetch(`https://discord.com/api/v9/users/${ptObj.id}`, {
            headers: {
              Authorization: `Bot ${process.env.TOKEN}`,
            },
          });
          const json = await response.json();

          const dataObj = {
            name: json.username,
            value: `Points: ${ptObj.points.toString()}`,
          };
          return dataObj;
        })
      );
      embed = new EmbedBuilder()
        .setTitle("Quiz LeaderBoard")
        .setFields(leaderboardPoints)
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
