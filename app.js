const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json');
const axios = require('axios');
const { response } = require('express');

const CTAPI_EVENT_URL = "https://ctftime.org/api/v1/events"
const CTAPI_REQUEST_HEADERS = {
    "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    let content = msg.content;
    if (content.slice(0,2) == './') {
        content = content.slice(2);
        if(content == 'help') {
            msg.reply("\n./ping : pong \n ./list: list ctfs in this week (limit = 10)\n ./info {event_id} : get more information of the event\n");
        } else if(content == 'ping') {
            msg.reply("pong");
        } else if(content.startsWith('list')) {
            let res = "\n"
            let start = new Date().getTime();
            let finish = start + 604800000;
            axios.get(`${CTAPI_EVENT_URL}/?limit=10&start=${start}&finish=${finish}`,{headers:CTAPI_REQUEST_HEADERS})
                .then(response => {
                    for(var i=0; i<10; i++){
                        let event = response.data[i];
                        res = res.concat("[",i,"] Title : ",event.title,"\n");
                        res = res.concat("[+] Date  : ", event.start, " ~ ", event.finish, "\n");
                        res = res.concat("[+] Event Id : ", event.id, "\n\n");
                    }
                    msg.reply(res);
                })
                .catch(error => msg.reply("Something Wrong....\n"))
        } else if(content.startsWith('info')) {
            let id = parseInt(content.slice(4));
            let res = "\n"
            if(!isNaN(id)){
                axios.get(`${CTAPI_EVENT_URL}/${id}/`,{headers:CTAPI_REQUEST_HEADERS})
                    .then(response => {
                        let event = response.data;
                        res = res.concat("[-] Title : ",event.title,"\n");
                        res = res.concat("[+] Date  : ",event.start, " ~ ", event.finish, "\n");
                        res = res.concat("[+] Format : ",event.format,"\n");
                        res = res.concat("[+] Weight : ",event.weight,"\n");
                        res = res.concat("[+] URL : ",event.url,"\n\n");
                        msg.reply(res);
                    })
                    .catch(error => msg.reply("Something Wrong....\n"))
            } else {msg.reply("Invalid id\n");}
        } 
        else if(content == 'cat flag') {
            msg.reply("PLUS{D0_y0u_l0v3_c47?_1_l0v3_c47_t000!\\_:>}");
        }
    }
});

client.login(token.token);