const client = require("..");
const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");
const CHANNEL_ID = "1013017767370305546";
const ERR_CHANNEL_ID = "1010558786592849950";

const AI_KEY = process.env.AI_KEY;
const B_ID = process.env.B_ID;

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;

  try {
    message.channel.sendTyping();

    const response = await fetch(
      `http://api.brainshop.ai/get?bid=${B_ID}&key=${AI_KEY}&uid=${message.author.id}&msg=${message.content}`
    ).then((res) => res.json());

    const resText = response.cnt;
    if (resText === "") return;

    message.reply({
      content: `${resText}`,
    });
  } catch (error) {
    message.reply({
      content: "Something went wrong!\nPlease try again...",
    });
    const err_channel = client.channels.cache.get(ERR_CHANNEL_ID);

    err_channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("Error")
          .setColor("#ff0000")
          .addFields({
            name: "Error",
            value: `${error}`,
          })
          .setTimestamp(),
      ],
    });
  }
});
