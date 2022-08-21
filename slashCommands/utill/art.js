const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Component } = require('discord.js');
const fetch = require('node-fetch');
const WomboDream = require('dream-api');

module.exports = {
    name: "art",
    description: "Create an ai generated art.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "description",
            description: "The description of the art.",
            type: 3,
            required: true
        },
        {
            name: "style",
            description: "The style of the art.",
            type: 4,
            required: true,
            choices: [
                {
                    name: "realsitic",
                    value: 32,
                },
                {
                    name: "throwback",
                    value: 35,
                },
                {
                    name: "malevolent",
                    value: 40,
                },
                {
                    name: "no-style",
                    value: 3,
                },
                {
                    name: "ghibli",
                    value: 22,
                },
                {
                    name: "melancholic",
                    value: 28,
                },
                {
                    name: "provenance",
                    value: 17,
                },
                {
                    name: "arcane",
                    value: 34,
                },
                {
                    name: "radioactive",
                    value: 27,
                },
                {
                    name: "mystical",
                    value: 11,
                },
                {
                    name: "blacklight",
                    value: 20,
                },
                {
                    name: "psychic",
                    value: 9,
                },
                {
                    name: "hd",
                    value: 7,
                },
                {
                    name: "vibrant",
                    value: 6,
                },
                {
                    name: "fantasy-art",
                    value: 5,
                },
                {
                    name: "steampunk",
                    value: 4,
                },
                {
                    name: "dark-fantasy",
                    value: 10,
                },
                {
                    name: "rose-gold",
                    value: 18,
                },
                {
                    name: "wuhtercuhler",
                    value: 16,
                },
                {
                    name: "s-dali",
                    value: 15,
                },
                {
                    name: "etching",
                    value: 14,
                },
                {
                    name: "baroque",
                    value: 13,
                },
                {
                    name: "psychedelic",
                    value: 21,
                },
                {
                    name: "ukiyoe",
                    value: 2,
                },
                {
                    name: "synthwave",
                    value: 1,
                }
            ]
        }
    ],
    cooldown: 3000,
    run: async (client, interaction) => {
        const description = interaction.options.get("description").value;
        const style = interaction.options.get("style").value;

        const waitEmbed = new EmbedBuilder()
            .setTitle("Art is being generated...")
            .setColor("#ffffff")
            .setTimestamp()
            .setDescription("This may take a upto 15-20 seconds depends on your internet speed.")
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: "jpg" }),
            })

        await interaction.deferReply({
            embeds: [waitEmbed]
        });

        let image = await WomboDream.generateImage(style, description);

        const embed = new EmbedBuilder()
            .setTitle("Art")
            .setColor("#ffffff")
            .setDescription(`**Description :** ${description}`)
            .setFooter({
                text: `Requested by ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ extension: "jpg" }),
            })
            .setImage(image.result.final)
            .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Download")
                    .setStyle(ButtonStyle.Link)
                    .setURL(image.result.final)
                    .setEmoji("📥")
            )
            .addComponents(
                new ButtonBuilder()
                    .setLabel("AI-ToS")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://www.w.ai/terms-of-service-wombo-dream")
                    .setEmoji("⚖️")
            )

        return interaction.editReply({
            embeds: [embed],
            components: [row]
        }).catch((err) => {
            interaction.reply("Something went wrong.");
        })
    }
}