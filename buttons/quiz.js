const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

const QUIZ_MONGODB_URI = process.env.QUIZ_MONGODB_URI || "mongodb://localhost:27017/quiz";

const pointsSchema = new mongoose.Schema({
  id: String,
  points: Number,
});

const PointsModel = mongoose.model("Points", pointsSchema);

async function connectToDB() {
  await mongoose.connect(QUIZ_MONGODB_URI);
}

async function saveToDB(playerPoint) {
  await playerPoint.save();
}

connectToDB();

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
