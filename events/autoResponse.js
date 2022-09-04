const client = require("..");
const prefix = client.prefix
const { EmbedBuilder } = require("discord.js");

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return;

    arrOfChannels = [
        '1006596760560476312', // Welcome channel
        '1007945165475946516', // anouncement channel
        '1006631177920184420', // Role channel
        '1006910839892213841', // server link channel
        '1006930378143043634', // other com links
        '1007138270582427780', // memes
        '1007137320669040661', // help channel
        '1007137398783742043', // theclp channel
        '1007559827473567784', // showcase
        '1006847243749445685', // resource
        '1006596760560476314', // c resources
        '1013017767370305546', // ai
        '1006792693336252456', //musci cmd channel
        '1006637008816443455', // tleac
        '1007249496222216282', //support
    ]
    if(arrOfChannels.includes(msg.channel.id)) return;

    if(msg.content.toLowerCase().startsWith(prefix)) {
        const embed = new EmbedBuilder()
        .setTitle("⚠️")
        .setDescription("All the commands are slash commands now. Please use `/` to use the commands.")
        .setColor("#ffffff")
        .setTimestamp()
        .setFooter({
            text: 'This message will be deleted in 10 seconds.',
        })
        msg.reply({
            embeds: [embed],
        }).then((m) => {
            setTimeout(() => {
                m.delete()
            }, 10000);
        })
    }

    if(msg.content.toLowerCase().includes('hmm')) {

        const replyArr = [
            "Dekh bahi...\nBaat karni hai toh kar ye **Bhains** ki trah hmm hmm mat kar... :|",
            "Bhains ki trah hmm hmm mat kar... :|",
            "Har bar sirf hmm yo lo gillet se shave kro aur jo marzi bolo... :)"
        ]

        const reply = replyArr[Math.floor(Math.random() * replyArr.length)];
        msg.reply({
            content: `${reply}`,
        })
    }

    if(msg.content.toLowerCase().includes('kya hua')) {
        msg.reply({
            content: `Gand faat gai, siyoge... :|`
        })
    }

    if(msg.content.length > 150) {
        msg.reply({
            content: 'Kripiya yaha gayan na batein...'
        })
    }

    if(msg.content.includes('<@1010412624984408156>')) {
        msg.reply({
            content: 'Kya hogya faltu ke ping kyu kr rha bahi :)'
        })
    }

    if(msg.content.toLowerCase().includes('simp')){
        msg.reply({
            content: 'Simping chal rahi hai ky iddhar 😏😏'
        })
    }

    if(msg.content.toLowerCase().includes('bahi')){
        msg.reply({
            content: 'Haa bahi bol...'
        })
    }

})