const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "truth",
  aliases: ["t"],
  description: "truth command.",
  cooldown: 3000,
  userPerms: [],
  botPerms: [],
  run: async (client, message, args) => {
    const truthText = await fetch(
      `https://raw.githubusercontent.com/losier/Kiri/master/Data/TextData/Truth.json`
    ).then((res) => res.json());
    const truth = truthText[Math.floor(Math.random() * truthText.length)];

    const member = message.mentions.users.first() || message.author;

    const t_embed = new EmbedBuilder()
      .setTitle("Truth")
      .setAuthor({
        name: member.username,
        iconURL: member.displayAvatarURL({ extension: "jpg" }),
      })
      .setDescription(
        `${member} Here is the random question for you:\n\n\n*${truth}*`
      )
      .setColor("#ffffff")
      .setTimestamp()
      .setThumbnail(
        "https://media.tenor.com/images/b2f04c9d19c4378840741fcdcd41fc5f/tenor.gif"
      );

    await message.reply({ embeds: [t_embed] });
  },
};
