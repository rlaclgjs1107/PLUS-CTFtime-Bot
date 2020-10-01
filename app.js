const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json');

const getCTFTimeEvents = require('./crawl.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    let content = msg.content;
    if (content.slice(0,2) == './') {
        content = content.slice(2);
        if(content == 'help') {
            msg.reply("plus-ctftime-bot")
        } else if(content == 'ping') {
            msg.reply("pong");
        } else if(content == 'list') {
            let ctfTitles = "";
            let ctfEvents = await getCTFTimeEvents();
            ctfEvents.forEach(function(elem, idx){
                ctfTitles = ctfTitles.concat("[",idx,"] ",elem.title, "\n");
            });
            msg.reply(ctfTitles);
        } else if(content == 'update') {
            
        }
    }
});

client.login(token.token);