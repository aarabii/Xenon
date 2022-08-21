const { EmbedBuilder, WebhookClient } = require("discord.js");
const client = require("..");
const WEBHOOK_ID = process.env.WEBHOOK_ID;
const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN;

client.on("guildMemberAdd", (member) => {
  const webhookClient = new WebhookClient({
    id: WEBHOOK_ID,
    token: WEBHOOK_TOKEN,
  });

  const WelcomeMessageCollection = [
    `Welcome to the server, ${member}!`,
    `Hello 👋, ${member}!`,
    `Namaste 🙏, ${member}!`,
    `Hola 👋, ${member}!`,
    `Hey, ${member}!`,
    `Welcome, ${member}!`,
    `${member} joined the party.`,
    `${member} is here.`,
    `Welcome, ${member}. We hope you brought pizza.`,
    `A wild ${member} appeared.`,
    `${member} just landed.`,
    `${member} just slid into the server.`,
    `${member} just showed up!`,
    `Welcome ${member}. Say hi!`,
    `${member} hopped into the server.`,
    `Everyone welcome ${member}!`,
    `Glad you're here, ${member}.`,
    `Good to see you, ${member}.`,
    `Yay you made it, ${member}!`,
    `${member} just joined the server - glhf!`,
    `${member} just joined. Everyone, look busy!`,
    `${member} just joined. Can I get a heal?`,
    `${member} joined your party.`,
    `${member} joined. You must construct additional pylons.`,
    `Ermagherd. ${member} is here.`,
    `Welcome, ${member}. Stay awhile and listen.`,
    `Welcome, ${member}. We were expecting you ( ͡° ͜ʖ ͡°)`,
    `Welcome, ${member}. We hope you brought pizza.`,
    `Welcome ${member}. Leave your weapons by the door.`,
    `A wild ${member} appeared.`,
    `Swoooosh. ${member} just landed.`,
    `Brace yourselves. ${member} just joined the server.`,
    `${member} just joined. Hide your bananas.`,
    `${member} just arrived. Seems OP - please nerf.`,
    `${member} just slid into the server.`,
    `A ${member} has spawned in the server.`,
    `Big ${member} showed up!`,
    `Where's ${member}? In the server!`,
    `${member} hopped into the server. Kangaroo!!`,
    `${member} just showed up. Hold my beer.`,
    `Challenger approaching - ${member} has appeared!`,
    `It's a bird! It's a plane! Nevermind, it's just ${member}.`,
    `It's ${member}! Praise the sun! \\\\[T]/`,
    `Never gonna give ${member} up. Never gonna let ${member} down.`,
    `Ha! ${member} has joined! You activated my trap card!`,
    `Cheers, love! ${member}'s here!`,
    `Hey! Listen! ${member} has joined!`,
    `We've been expecting you ${member}`,
    `It's dangerous to go alone, take ${member}!`,
    `${member} has joined the server! It's super effective!`,
    `Cheers, love! ${member} is here!`,
    `${member} is here, as the prophecy foretold.`,
    `${member} has arrived. Party's over.`,
    `Ready player ${member}`,
    `${member} is here to kick butt and chew bubblegum. And ${member} is all out of gum.`,
    `Hello. Is it ${member} you're looking for?`,
    `${member} has joined. Stay a while and listen!`,
    `Roses are red, violets are blue, ${member} joined this server with you`,
  ];

  const WelcomeMessage =
    WelcomeMessageCollection[
      Math.floor(Math.random() * WelcomeMessageCollection.length)
    ];

  const welcomeEmbed = new EmbedBuilder()
    .setAuthor({
      name: member.user.tag,
      iconURL: member.user.avatarURL(),
    })
    .setTitle("Welcome to the server!")
    .setDescription(
      `Hello ${member}, Welcome to KIIT coding community!\n\`\`\`\yaml\nYou are our ${member.guild.memberCount} member.\`\`\``
    )
    .addFields({
      name: "Feel free to pickup your tech stack at: ",
      value: "<#1006631177920184420>",
    })
    .addFields({
      name: "Chat with the community at: ",
      value: "<#1006596760560476316>",
    })
    .setColor("#008080")
    .setImage(
      "https://cdn.discordapp.com/attachments/1010558856037933086/1010558938992873503/KIIT-photo-750x430.jpeg"
    )
    .setTimestamp()
    .setFooter({
      text: member.guild.name,
      iconURL: member.guild.iconURL(),
    });

  webhookClient.send({
    username: client.user.username,
    avatarURL: client.user.displayAvatarURL(),
    content: WelcomeMessage,
    embeds: [welcomeEmbed],
  });
});
