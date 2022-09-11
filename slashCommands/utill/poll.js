const { channel } = require('diagnostics_channel');
const { EmbedBuilder, ApplicationCommandType } = require('discord.js')

module.exports = {
    name: 'poll',
    description: 'Create a poll',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'channel',
            description: 'The channel to send the poll in',
            type: 7,
            required: true
        },
        {
            name: 'results',
            description: 'The channel to send the results in',
            type: 7,
            required: true
        },
        {
            name: 'question',
            description: 'The question to ask',
            type: 3,
            required: true
        },
        {
            name: 'option1',
            description: 'The first option',
            type: 3,
            required: true
        },
        {
            name: 'option2',
            description: 'The second option',
            type: 3,
            required: true
        },
        {
            name: 'option3',
            description: 'The third option',
            type: 3,
            required: false
        },
        {
            name: 'option4',
            description: 'The fourth option',
            type: 3,
            required: false
        }
    ],
    run: async (client, interaction) => {
        const USER = interaction.member;
        const ROLE = '1007246501149413387';

        if (USER.roles.cache.has()) {
            const unknownUserEmbed = new EmbedBuilder()
                .setTitle('⚠️ Missing Roles')
                .setDescription(`You do not have role to use this command.\n\n**Required Role:**\n <@&${ROLE}>`)
                .setColor('#ff0000')
                .setTimestamp()
                
            return interaction.reply({
                embeds: [unknownUserEmbed],
                ephemeral: true
            })
        }

        const question = interaction.options.getString('question');
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');
        const option3 = interaction.options.getString('option3') || 'None of the above';
        const option4 = interaction.options.getString('option4') || 'All of the above';

        const pollChannel = interaction.options.get('channel').channel;
        const resultsChannel = interaction.options.get('results').channel;

        const pollEmbed = new EmbedBuilder()
            .setTitle('Poll')
            .setDescription(`**${question}**\n\n`)
            .addFields(
                {
                    name: '**Option 1️⃣ :**',
                    value: `*${option1}*`,
                },
                {
                    name: '**Option 2️⃣ :**',
                    value: `*${option2}*`,
                },
                {
                    name: '**Option 3️⃣ :**',
                    value: `*${option3}*`,
                },
                {
                    name: '**Option 4️⃣ :**',
                    value: `*${option4}*`,
                }
            )
            .setColor('#ffffff')
            .setTimestamp()
            .setFooter({
                text: 'The poll gets closed if the creator reacts with ❌'
            })

        const successEmbed = new EmbedBuilder()
            .setTitle('✅ Success')
            .setDescription(`Poll has been sent to ${pollChannel} and results will be sent to ${resultsChannel}`)
            .setColor('#00ff00')
            .setTimestamp()

        const pollChh = client.channels.cache.get(pollChannel.id);
        const resultsChh = client.channels.cache.get(resultsChannel.id);

        await interaction.deferReply();

            const poll = await pollChh.send({
                embeds: [pollEmbed],
                fetchReply: true
            })

            await poll.react('1️⃣');
            await poll.react('2️⃣');
            await poll.react('3️⃣');
            await poll.react('4️⃣');
            await poll.react('❌');

            await interaction.editReply({
                embeds: [successEmbed],
                ephemeral: true
            })

        const filter = (reaction) => {
            return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '❌'].includes(reaction.emoji.name);
        }

        const collector = poll.createReactionCollector({ filter, time: 1000 * 60 * 60 * 24 });

        collector.on('collect', (reaction, user) => {
            resultsChh.send(`Collected ${reaction.emoji.name} from ${user.tag}`);

            if (reaction.emoji.name === '❌') {
                if(user.id === '752404472927486063') {
                    collector.stop();
                    resultsChh.send('Poll has been closed');
                }
                return;
            }

            // var option1result = 0;
            // var option2result = 0;
            // var option3result = 0;
            // var option4result = 0;

            // if (reaction.emoji.name === '1️⃣') {
            //     option1result++;
            // }
            // if (reaction.emoji.name === '2️⃣') {   
            //     option2result++;
            // }
            // if (reaction.emoji.name === '3️⃣') {
            //     option3result++;
            // }
            // if (reaction.emoji.name === '4️⃣') {
            //     option4result++;
            // }

            // const resultsEmbed = new EmbedBuilder()
            //     .setTitle('Poll Results')
            //     .setDescription(`**${question}**\n\n`)
            //     .addFields(
            //         {
            //             name: `**${option1}**`,
            //             value: `Got ${option1result} votes`,
            //         },
            //         {
            //             name: `**${option2}**`,
            //             value: `Got ${option2result} votes`,
            //         },
            //         {
            //             name: `**${option3}**`,
            //             value: `Got ${option3result} votes`,
            //         },
            //         {
            //             name: `**${option4}**`,
            //             value: `Got ${option4result} votes`,
            //         },
            //     )
            //     .setColor('#ffffff')
            //     .setTimestamp()

            // resultsChh.send({
            //     embeds: [resultsEmbed]
            // }).then((m) => {
            //     setInterval(() => {
            //         m.edit({
            //             embeds: [resultsEmbed]
            //         })
            //     }, 1500)
            // })

            // // update resultsEmbed every 5 seconds
            
        })

        if (collector.ended) {
            resultsChh.send('Poll has ended');
        }

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        })
    }
}