const { EmbedBuilder, WebhookClient } = require('discord.js');
const client = require("..");
const WEBHOOK_ID = process.env.WEBHOOK_ID;
const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN


client.on("guildMemberAdd", (member) => {
    const webhookClient = new WebhookClient({ id: WEBHOOK_ID, token: WEBHOOK_TOKEN });

    const welcomeEmbed = new EmbedBuilder()
        .setAuthor({
            name: member.guild.name,
            iconURL: member.guild.iconURL(),
        })
        .setTitle("Welcome to the server!")
        .setDescription(`Hello ${member}, Welcome to KIIT coding community!\n\`\`\`\yaml\nYou are our ${member.guild.memberCount} member.\`\`\``)
        .addFields({
            name: "Feel free to pickup your tech stack at: ",
            value: "<#1006631177920184420>"
        })
        .addFields({
            name: "Chat with the community at: ",
            value: "<#1006596760560476316>"
        })
        .setColor("#008080")
        .setImage("https://cdn.discordapp.com/attachments/1010558856037933086/1010558938992873503/KIIT-photo-750x430.jpeg")
        .setTimestamp()

    webhookClient.send({
        username: member.user.username,
        avatarURL: member.user.displayAvatarURL(),
        embeds: [welcomeEmbed],
    })
})