const client = require("..");

client.on('messageCreate', async (msg) => {
    if(msg.author.bot) return;
    // if(msg.channel.id === '1013017767370305546' || '1007945165475946516') return;

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