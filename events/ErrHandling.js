const { EmbedBuilder, RESTJSONErrorCodes } = require("discord.js");
const client = require("..");
const CHANNEL = "1010558786592849950";

client.on("messageCreate", async () => {
  const ch = client.channels.cache.get(CHANNEL);

  process.setMaxListeners(0);

  process.on("unhandledRejection", (error) => {   

    if(error.startsWith("DiscordAPIError[50035]:")) return; // ignore this error

    const errEmbed = new EmbedBuilder()
      .setTitle("Unhandled Rejection")
      .setColor("Red")
      .addFields(
        {
          name: "Error name:",
          value: `\`\`\`yaml\n${error.name}\n\`\`\``,
        },
        {
          name: "Error Message:",
          value: `\`\`\`yaml\n${error.message}\n\`\`\``,
        },
        {
          name: "Error path:",
          value: `\`\`\`yaml\n${error.path}\n\`\`\``,
        },
        {
          name: "Error code:",
          value: `\`\`\`yaml\n${error.code}\n\`\`\``,
        },
        {
          name: "Error method:",
          value: `\`\`\`yaml\n${error.method}\n\`\`\``,
        }
      ).setTimestamp;

    const errEmbed2 = new EmbedBuilder()
      .setTitle("Unhandled Rejection")
      .setColor("Red")
      .addFields({
        name: "Error :",
        value: `\`\`\`yaml\n${error}\n\`\`\``,
      })
      .setTimestamp();

    try {
      ch.send({
        embeds: [errEmbed],
      });
    } catch {
      ch.send({
        embeds: [errEmbed2],
      });
    }
  });

  process.on("unhandledRejection", async (reason, promise) => {
    const PEmbed = new EmbedBuilder()
      .setTitle("**Unhandle Rejection**")
      .setColor("Blurple")
      .addFields(
        {
          name: "Error:",
          value: `\`\`\`yaml\n${Promise.resolve(promise)}\n\`\`\``,
        },
        {
          name: "Reason: ",
          value: `\`\`\`js\n${reason.stack || reason}\n\`\`\``,
        }
      )
      .setTimestamp();

    const REmbed = new EmbedBuilder()
      .setTitle("**Unhandle Rejection**")
      .setColor("#ffffff")
      .addFields({
        name: "Error :",
        value: `\`\`\`js\n${reason}\n\`\`\``,
      })
      .setTimestamp();

    try {
      ch.send({
        embeds: [PEmbed],
      });
    } catch {
      ch.send({
        embeds: [REmbed],
      });
    }
  });

  process.on("warning", (warning) => {
    const warnEmbed = new EmbedBuilder()
      .setTitle("Warning")
      .setColor("#ffffff")
      .addFields(
        {
          name: "Warning name:",
          value: `\`\`\`yaml\n${warning.name}\n\`\`\``,
        },
        {
          name: "Warning message:",
          value: `\`\`\`yaml\n${warning.message}\n\`\`\``,
        },
        {
          name: "Warning stack:",
          value: `\`\`\`yaml\n${warning.stack}\n\`\`\``,
        }
      )
      .setTimestamp();

    try {
      ch.send({
        embeds: [warnEmbed],
      });
    } catch (error) {
      ch.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Warning error")
            .setColor("#ffffff")
            .addFields({
              name: "Error :",
              value: `\`\`\`yaml\n${error}\n\`\`\``,
            })
            .setTimestamp(),
        ],
      });
    }
  });
});

client.on("shardError", (error) => {
  const ch = client.channels.cache.get(CHANNEL);
  const eEmbed = new EmbedBuilder()
    .setTitle("Shard Errors")
    .setColor("#ffffff")
    .setTimestamp()
    .addFields({
      name: "Error :",
      value: `\`\`\`yaml\n${error}\n\`\`\``,
    });

  try {
    ch.send({
      embeds: [eEmbed],
    });
  } catch (error) {
    ch.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("ShadyErr error")
          .setColor("#ffffff")
          .addFields({
            name: "Error :",
            value: `\`\`\`yaml\n${error}\n\`\`\``,
          })
          .setTimestamp(),
      ],
    });
  }
});
