const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const fetch = require("node-fetch");
const client = require("..");
const CHANNEL = "1010908789450494096";
const ERR_Channel = "1010558786592849950";

client.on("ready", async (mesaage) => {
  const channel = client.channels.cache.get(CHANNEL);
  const err_channel = client.channels.cache.get(ERR_Channel);
  try {
    setInterval(async () => {
      subRedditArr = [
        "WebDev",
        "Frontend",
        "CSS",
        "AskProgramming",
        "LearnProgramming",
        "Coding",
        "JavaScript",
        "LearnJavaScript",
        "PHP",
        "WordPress",
        "LearnPython",
        "BadCode",
        "CodingHelp",
      ];
      const subReddit =
        subRedditArr[Math.floor(Math.random() * subRedditArr.length)];

      await fetch(
        "https://www.reddit.com/r/"+subReddit+"/random/.json?t=all&limit=10"
      )
        .then((res) => res.json())
        .then((json) => {
          const getPost = json[Object.keys(json)[0]];
          const getPostData = getPost[Object.keys(getPost)[1]];
          const children = getPostData[Object.keys(getPostData)[4]];
          const childrenObj = children[Object.keys(children)[0]];
          const data = childrenObj[Object.keys(childrenObj)[1]];

          const title = data["title"] || "No title found...";
          const author = data["name"] || "No author found...";
          const subRedditName =
            data["subreddit_name_prefixed"] || "No subReddit found...";
          const permURL = data["permalink"];
          const thumbnail =
            data["thumbnail"] ||
            "https://cdn.discordapp.com/attachments/1010558856037933086/1013839980600250368/reddit-logo.webp";
          const images =
            data["url"] ||
            "https://cdn.discordapp.com/attachments/1010558856037933086/1013302554282692721/images.png";

          const mainEmbed = new EmbedBuilder()
            .setTitle(title)
            .setColor("#FFA500")
            .setImage(images)
            .setTimestamp()
            .setAuthor({
              name: author,
            })
            .setFooter({
              text: subRedditName,
              iconURL:
                "https://cdn.discordapp.com/attachments/1010558856037933086/1013302554282692721/images.png",
            })
            .setThumbnail(thumbnail);

          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel("Original")
              .setStyle(ButtonStyle.Link)
              .setURL(`https://reddit.com/${permURL}`)
              .setEmoji("1013303147780911104")
          );

          channel.send({
            embeds: [mainEmbed],
            components: [row],
          });
        })
        .catch((err) => {
          err_channel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle("NEWS JSON Error")
                .setDescription(`${err}`)
                .setColor("#FF0000")
                .setTimestamp(),
            ],
          });
        });
    }, 1000 * 60 * 30);
  } catch (error) {
    err_channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("News Error")
          .setDescription(`${error}`)
          .setColor("#FF0000")
          .setTimestamp(),
      ],
    });
  }
});
