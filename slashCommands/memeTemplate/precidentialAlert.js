const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "presidentialalert",
    description: "make presidentialalert meme",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: "text",
            description: "The text to make presidentialalert",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, options) => {
        await interaction.deferReply();
        const text = interaction.options.getString("text");

        const imageBuf = await fetch(
            `https://frenchnoodles.xyz/api/endpoints/presidentialalert/?text=${text}`
        );
        const image = await imageBuf.buffer();

        const attachment = new AttachmentBuilder(image, {
            name: "precidentialalert.png",
        });
        await interaction.editReply({
            content: `${interaction.member} here is your presidential alert meme.`,
            files: [attachment],
        });
    }
}