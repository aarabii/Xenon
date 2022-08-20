const { EmbedBuilder, ApplicationCommandType } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "nickname",
  description: "Change your friends nickname.",
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: "ManageNicknames",
  cooldown: 5000,
  options: [
    {
        name: "user",
        description: "The user you want to change the nickname of.",
        type: 6,
        required: true
    }
  ],
  run: async (client, interaction) => {
    const member = interaction.guild.members.cache.get(interaction.options.get("user").value);

    const nickname = await fetch(`https://raw.githubusercontent.com/losier/Kiri/master/Data/TextData/nickname.json`).then(res => res.json());
    const newNickname = nickname[Math.floor(Math.random() * nickname.length)]

    try {
        const embed = new EmbedBuilder()
            .setTitle("Nickname Changed")
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ extension: 'jpg' })
            })
            .setDescription(`Successfully changed ${member.user.username}'s nickname to ${member}`)
            .setColor("#ffffff")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        await member.setNickname(newNickname);
        return interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.log(newNickname)
        console.log(error);
        return interaction.reply({ content: `Sorry, I failed changing your nickname!`, ephemeral: true });
    }

  },
};
