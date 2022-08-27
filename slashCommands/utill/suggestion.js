const {
  AttachmentBuilder,
  ApplicationCommandType,
  EmbedBuilder,
  WebhookClient,
} = require("discord.js");
const fetch = require("node-fetch");

const SUGGESTION_WEBHOOK_ID = process.env.SUGGESTION_WEBHOOK_ID;
const SUGGESTION_WEBHOOK_TOKEN = process.env.SUGGESTION_WEBHOOK_TOKEN;

module.exports = {
  name: "suggestion",
  description: "suggestion for channel or server",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "suggestion-type",
      description: "type of suggestion",
      type: 3,
      required: true,
      choices: [
        {
          name: "server",
          value: "server",
        },
        {
          name: "channel",
          value: "channel",
        },
        {
          name: "bot",
          value: "bot",
        },
      ],
    },
    {
      name: "suggestion-content",
      description: "content of suggestion",
      type: 3,
      required: true,
    },
  ],
  cooldown: 3000,
  run: async (client, interaction, options) => {
    await interaction.deferReply();

    const suggestionWebhook = new WebhookClient({
      id: SUGGESTION_WEBHOOK_ID,
      token: SUGGESTION_WEBHOOK_TOKEN,
    });

    const suggest = interaction.options.get("suggestion-type").value;
    const content = interaction.options.get("suggestion-content").value;
    var suggestionValue = "";

    if (suggest === "server") {
      suggestionValue = "server";
    } else if (suggest === "channel") {
      suggestionValue = "channel";
    } else if (suggest === "bot") {
      suggestionValue = "bot";
    }

    const suggestionEmbed = new EmbedBuilder()
      .setTitle("🏗️ Suggestion")
      .setColor("#00FF00")
      .setTimestamp()
      .addFields(
        {
            name: `${interaction.user.username} have some suggestion for ${suggestionValue}`,
            value: `\`\`\`yaml\n${content}\n\`\`\``,
        }
      );

    try {
      await interaction.editReply({
        content: "Thank you for your suggestion!",
      });

      suggestionWebhook.send({
        username: interaction.user.username,
        avatarURL: interaction.user.displayAvatarURL(),
        embeds: [suggestionEmbed],
      });
    } catch (error) {
      await interaction.editReply({
        content: `Sorry, I failed sending your suggestion!"`,
      });
    }
  },
};
