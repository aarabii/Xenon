const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wouldyourather",
  aliases: ["wyr", "would-you-rather"],
  description: "dare command.",
  cooldown: 3000,
  userPerms: [],
  botPerms: [],
  run: async (client, message, args) => {
    const wouldYouRatherText = await fetch('https://raw.githubusercontent.com/losier/Kiri/master/Data/TextData/would-you-rather.json').then((res) => res.json());
    const wouldYouRather = wouldYouRatherText[Math.floor(Math.random() * wouldYouRatherText.length)];

    const Target = message.mentions.users.first() || message.author;

    const question = wouldYouRather.split("Would you rather ")[1];
    const question1 = question.split(" or ")[0];
    const question2 = question.split(" or ")[1];

    const mainEmbed = new EmbedBuilder()
        .setTitle("Would You Rather")
        .setAuthor({
            name: message.author.username,
            iconURL: message.author.displayAvatarURL({ extension: "jpg" }),
        })
        .setDescription(
            `${Target.username} what will you choose between :\n\🅰️ : *${question1}* \n🅱️ : *${question2}*`
        )
        .setColor("#ffffff")
        .setTimestamp()
        .setFooter({
            text: `You have only 15 seconds to choose ${Target.tag}`
        })


    const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🅰️")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('one')
            )
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🅱️")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('two')
            );

    message.channel.send({
        embeds: [mainEmbed],
        components: [row]
    });
    
    const question1Embed = new EmbedBuilder()
        .setTitle("Would You Rather")
        .setAuthor({
            name: message.author.username,
            iconURL: message.author.displayAvatarURL({ extension: "jpg" }),
        })
        .setDescription(
            `${Target.username} choosed **${question1}** from\n\n *${question1}* and *${question2}* `
        )
        .setColor("#ffffff")
        .setTimestamp()


    const question2Embed = new EmbedBuilder()
        .setTitle("Would You Rather")
        .setAuthor({
            name: message.author.username,
            iconURL: message.author.displayAvatarURL({ extension: "jpg" }),
        })
        .setDescription(
            `${Target.username} choosed **  ${question2}** from\n\n *${question1}* and *${question2}* `
        )
        .setColor("#ffffff")
        .setTimestamp()


        const filter = i => i.customId === 'one' && i.user.id === Target.id;
        const filter2 = i => i.customId === 'two' && i.user.id === Target.id;

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
        const collector2 = message.channel.createMessageComponentCollector({ filter: filter2, time: 15000 });

        collector.on('collect', async i => {
            await i.update({ embeds: [question1Embed], components: [] });
        });
        
        collector2.on('collect', async i => {
            await i.update({ embeds: [question2Embed], components: [] });
        })
  },
};
