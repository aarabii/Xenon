const { AttachmentBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "spongebobburnpaper",
    description: "make sponge bob burn paper meme",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: "text",
            description: "The text to make spongebobburnpaper",
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction, options) => {
        await interaction.deferReply();
        const text = interaction.options.getString("text");

        const imageBuf = await fetch(
            `https://frenchnoodles.xyz/api/endpoints/spongebobburnpaper/?text=${text}`
        );
        const image = await imageBuf.buffer();

        const attachment = new AttachmentBuilder(image, {
            name: "drake.png",
        });
        await interaction.editReply({
            content: `${interaction.member} here is your sponge bob burn paper meme.`,
            files: [attachment],
        });
    }
}