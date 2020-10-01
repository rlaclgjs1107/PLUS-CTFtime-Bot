const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json');

const getCTFTimeEvents = require('./crawl.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let content = msg.content;
    if (content.slice(0,2) == './') {
        content = content.slice(2);
        if(content == 'help') {
            msg.reply("plus-ctftime-bot")
        } else if(content == 'ping') {
            msg.reply("pong");
        } else if(content == 'list') {
            const ctfEvents = getCTFTimeEvents();
            console.log(ctfEvents);
            msg.reply(ctfEvents);
        } else if(content == 'update') {

        }
    }
});

client.login(token.token);