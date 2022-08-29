const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const client = require("..");
const fetch = require("node-fetch");
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const CHANNEL = "1010908789450494096";

client.on("ready", async (message) => {
  const channel = client.channels.cache.get(CHANNEL);
  try {
    setInterval(() => {
      const queryArr = ["programming", "coding", "code", "technology"];
      const query = queryArr[Math.floor(Math.random() * queryArr.length)];

      fetch(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${NEWS_API_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          const articles = json.articles;
          const article = articles[Math.floor(Math.random() * articles.length)];
          const embed = new EmbedBuilder()
            .setTitle(article.title)
            .setDescription(article.description)
            .setThumbnail(article.urlToImage)
            .setURL(article.url)
            .setColor("#00ff00")
            .setTimestamp();

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Read more...")
                    .setStyle(ButtonStyle.Link)
                    .setURL(article.url)
                    .setEmoji("📰")
            )

          channel.send({
            embeds: [embed],
            components: [row]
          });
        });
    }, Math.floor(Math.random()*(60-15+1)+15));
  } catch (error) {
    channel.send({
      content: `${error}`,
    }).then(() => {
      setTimeout((m) => {
        m.delete();
      }, 5000);
    })
  }
});
