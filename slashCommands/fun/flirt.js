const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const flirtTextCollection = require('../../data/textData/flirt.json');

module.exports = {
    name: 'flirt',
    description: 'Flirt with you loveones',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'The user to flirt with',
            type: 6,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        const member = interaction.guild.members.cache.get(interaction.options.get("user").value);
        const flirtText = flirtTextCollection[Math.floor(Math.random() * flirtTextCollection.length)];
        const embed = new EmbedBuilder()
            .setTitle('Flirting')
            .setDescription(`Hey ${member},\n*${flirtText}*`)
            .setColor('#ffffff')
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL(),
            });
        const wait = require('node:timers/promises').setTimeout;
        await interaction.deferReply();
        await wait(100);
        await interaction.editReply({
            embeds: [embed],
        });
    }
}