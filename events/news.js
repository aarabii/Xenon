const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('..')
const fetch = require('node-fetch');
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const CHANNEL = '1010908789450494096'

client.on('message', async message => {
    if(message.content === 'startNewsLoop'){
        if (message.author.id !== '642394459396636703') return;

        const channel = client.channels.cache.get(CHANNEL);

        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`;
    
        const res = await fetch(url);
        const json = await res.json();
        const articles = json.articles;
        const article = articles[Math.floor(Math.random() * articles.length)];
    
        const embed = new EmbedBuilder()
            .setTitle(article.title)
            .setAuthor({
                name: article.source.name,
            })
            .setDescription(article.description)
            .setURL(article.url)
            .setThumbnail(article.urlToImage)
            .setColor('#ffffff')
            .setTimestamp()
        
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Read More...")
                    .setStyle(ButtonStyle.Link)
                    .setURL(article.url)
                    .setEmoji("📥")
            )
    
        setInterval(() => {
            channel.send({
                embeds: [embed],
                omponents: [row]
            });
        }, 1000 * 60 * 60);
    }
})