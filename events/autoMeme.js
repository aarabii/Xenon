const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fetch = require("node-fetch");
const client = require("..");
const MEME_CHANNEL = "1007138270582427780";
const ERR_Channel = "1010558786592849950";

client.on("ready", async (message) => {
  const channel = client.channels.cache.get(MEME_CHANNEL);
  const err_channel = client.channels.cache.get(ERR_Channel);

  try {
    setInterval(async () => {
      const subRedditArr = [
        "meme",
        "memes",
        "funny",
        "dankmemes",
        "wholesomememes",
        "me_irl",
        "dank_meme",
        "Memes_Of_The_Dank",
        "dankrishu",
        "SaimanSays",
        "ProgrammerHumor",
      ];

      const subReddit =
        subRedditArr[Math.floor(Math.random() * subRedditArr.length)];

      const response = await fetch(
        `https://meme-api.herokuapp.com/gimme/${subReddit}`
      ).then((res) => res.json());

      const postlink = response.postLink;
      const subreddit = response.subreddit;
      const title = response.title;
      const imageURL = response.url;
      const author = response.author;

      const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setColor("#FFA500")
        .setImage(`${imageURL}`)
        .setTimestamp()
        .setAuthor({
          name: `${author}`,
        })
        .setFooter({
          text: `r/${subreddit}`,
          iconURL:
            "https://cdn.discordapp.com/attachments/1010558856037933086/1013302554282692721/images.png",
        });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Original")
          .setStyle(ButtonStyle.Link)
          .setURL(`${postlink}`)
          .setEmoji("1013303147780911104")
      );

      channel.send({
        embeds: [embed],
        components: [row],
      });
    }, 1000 * 60 * 30);
  } catch (error) {
    const Err_embed = new EmbedBuilder()
      .setTitle(`Error`)
      .setColor("#FF0000")
      .addFields({
        name: "MEME_ERR",
        value: `${error}`,
      })
      .setTimestamp();

    err_channel.send({
      embeds: [Err_embed],
    });
  }
});
