const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "quiz",
  description: "Quiz on Tech Trivia",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    // TODO: Should come from API
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("option1").setLabel("1").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("option2").setLabel("2").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("option3").setLabel("3").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId("option4").setLabel("4").setStyle(ButtonStyle.Success)
    );
    const embed = new EmbedBuilder().setColor(0x0099ff).setTitle("Some title").setURL("https://discord.js.org").setDescription("Some description here");
    await interaction.reply({ content: "Pong!", ephemeral: true, embeds: [embed], components: [row] });

    // const embed = new EmbedBuilder()
    //   .setTitle("Topic")
    //   .setDescription(newTopic)
    //   .setColor("#ffffff")
    //   .setTimestamp()
    //   .setFooter({
    //     text: `Requested by: ${interaction.user.username}`,
    //     iconURL: interaction.user.displayAvatarURL(),
    //   });
    // const wait = require("node:timers/promises").setTimeout;
    // await interaction.deferReply();
    // await wait(100);
    // await interaction.editReply({
    //   embeds: [embed],
    // });
  },
};
