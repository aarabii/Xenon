const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "get avatar",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "users avatar you want to see",
            type: 6,
            required: false
        }
    ],
    cooldown: 3000,
    run: async (client , interaction) => {
        const member = interaction.options.getMember('user') || interaction.user;

        const avatar = member.displayAvatarURL({ size: 1024, dynamic: true })

        const PNGav = member.displayAvatarURL({ format: 'png', size: 1024 })
        const JPGav = member.displayAvatarURL({ format: 'jpg', size: 1024 })
        const WEBPav = member.displayAvatarURL({ format: 'webp', size: 1024 })

        const embed = new EmbedBuilder()
            .setTitle('🖼️ Avatar')
            .setColor('White')
            .setTimestamp()
            .setImage(avatar)

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('PNG')
                    .setStyle(ButtonStyle.Link)
                    .setURL(PNGav)
            )
            .addComponents(
                new ButtonBuilder()
                    .setLabel('JPG')
                    .setStyle(ButtonStyle.Link)
                    .setURL(JPGav)
            )
            .addComponents(
                new ButtonBuilder()
                    .setLabel('DYNAMIC')
                    .setStyle(ButtonStyle.Link)
                    .setURL(avatar)
            )
            .addComponents(
                new ButtonBuilder()
                    .setLabel('WEBP')
                    .setStyle(ButtonStyle.Link)
                    .setURL(WEBPav)
            )

        interaction.reply({
            embeds: [embed],
            components: [row1]
        })
    }
}