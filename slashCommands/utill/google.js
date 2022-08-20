const {
  AttachmentBuilder,
  EmbedBuilder,
  ApplicationCommandType,
} = require("discord.js");
const { waitForDebugger } = require("inspector");
const fetch = require("node-fetch");

module.exports = {
  name: "google",
  description: "Google something.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "query",
      description: "The query you want to search for.",
      type: 3,
      required: true,
    },
  ],
  cooldown: 3000,
  run: async (client, interaction) => {
    await interaction.deferReply();
    const Searchquery = interaction.options.get("query").value;
    const query = Searchquery.replace(/ /g, "+");

    const URL = `https://www.google.com/search?q=${query}`;
    const site = /^(https?:\/\/)/i.test(URL) ? URL : `http://${URL}`;
    const { body } = await fetch(
      `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
    );

    const attachmentImage = new AttachmentBuilder(body, {
      name: "screenshot.png",
    });

    const embed = new EmbedBuilder()
      .setTitle("Google")
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ extension: "jpg" }),
      })
      .setDescription(
        `\`\`\`yaml\nHere is your search result for \n\`\`\`: [${Searchquery}](${URL})`
      )
      .setThumbnail(
        "https://media.tenor.com/images/f97eeae3a7e0fd67d6813cfcdf875873/tenor.gif"
      )
      .setColor("#ffffff")
      .setTimestamp()
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      });

    try {
      await interaction
        .editReply({
          embeds: [embed],
        })
        .then((m) => {
          setTimeout(() => {
            interaction.channel.send({
              files: [attachmentImage],
            });
          }, 100);
        });
    } catch (error) {
      await interaction
        .editReply({
          embeds: [embed],
        })
        .then((m) => {
          setTimeout(() => {
            interaction.channel.send({
              content: "I can't send the image, sorry!",
              ephemeral: true,
            });
          }, 1000);
        });
    }
  },
};
