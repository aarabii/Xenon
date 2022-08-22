const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "drake",
    description: "make drake meme",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: "no-text",
            description: "The text to say no",
            type: 3,
            required: true,
        },
        {
            name: "yes-text",
            description: "The text to say yes",
            type: 3,
            required: true,
        }
    ],
    run: async (client, interaction, options) => {
        await interaction.deferReply();
        const textNo = interaction.options.getString("no-text");
        const textYes = interaction.options.getString("yes-text");

        const imageBuf = await fetch(
            `https://frenchnoodles.xyz/api/endpoints/drake?text1=${textNo}&text2=${textYes}`
        );
        const image = await imageBuf.buffer();

        const attachment = new AttachmentBuilder(image, {
            name: "drake.png",
        });
        await interaction.editReply({
            content: `${interaction.member} here is your drake meme.`,
            files: [attachment],
        });
    }
}