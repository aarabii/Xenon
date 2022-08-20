const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "dare",
  aliases: ["d"],
  description: "dare command.",
  cooldown: 3000,
  userPerms: [],
  botPerms: [],
  run: async (client, message, args) => {
    const dareText = await fetch(
      `https://raw.githubusercontent.com/losier/Kiri/master/Data/TextData/Dare.json`
    ).then((res) => res.json());
    const dare = dareText[Math.floor(Math.random() * dareText.length)];

    const member = message.mentions.users.first() || message.author;

    const d_embed = new EmbedBuilder()
      .setTitle("Dare")
      .setAuthor({
        name: member.username,
        iconURL: member.displayAvatarURL({ extension: "jpg" }),
      })
      .setDescription(
        `${member} Here is the random dare for you:\n\n\n*${dare}*`
      )
      .setColor("#ffffff")
      .setTimestamp()
      .setThumbnail(
        "https://media.tenor.com/images/3408860a5f846d39283b01e5d6b5712d/tenor.gif"
      );

    await message.reply({ embeds: [d_embed] });
  },
};
