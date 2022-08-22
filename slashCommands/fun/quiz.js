const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fetch = require("node-fetch");
const QUIZ_API_URL = "https://opentdb.com/api.php?amount=1&category=18&type=multiple&difficulty=";

function shuffleQnA(qnaArray) {
  return qnaArray.sort(() => Math.random() - 0.5);
}

async function getTriviaQuestion(difficulty = "easy") {
  const response = await fetch(`${QUIZ_API_URL}${difficulty}`);
  const { results } = await response.json();
  const resultObject = results[0];
  const correct = { answerText: resultObject.correct_answer, isCorrect: true };
  const incorrect = resultObject.incorrect_answers.map((answer) => {
    return { answerText: answer, isCorrect: false };
  });
  const question = resultObject.question;
  const answers = shuffleQnA([correct, ...incorrect]);
  const qna = {
    question,
    answers,
  };

  return qna;
}

module.exports = {
  name: "quiz",
  description: "Quiz on Tech Trivia",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    const qna = await getTriviaQuestion();
    const row = new ActionRowBuilder().addComponents(
      ...qna.answers.map((answer, i) => {
        return new ButtonBuilder()
          .setCustomId(answer.isCorrect ? "TRUE" : `FALSE${i}`) // custom id cannot be duplicated
          .setLabel(answer.answerText)
          .setStyle(ButtonStyle.Success);
      })
    );
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(qna.question)
      .setTimestamp()
      .setFooter({
        text: `Requested by: ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ ephemeral: false, embeds: [embed], components: [row] });
  },
};
