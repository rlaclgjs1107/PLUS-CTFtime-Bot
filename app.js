const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json');

const getCTFTimeEvents = require('./crawl.js');
const { stringify } = require('querystring');

let eventFileName = "./ctfTimeEvents.json";
let encoding = "utf8";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    let content = msg.content;
    if (content.slice(0,2) == './') {
        content = content.slice(2);
        if(content == 'help') {
            msg.reply("\n./ping : pong \n ./list [n] : list n ctfs (max : 10 / default : 5) \n ./update : update ctf list\n");
        } else if(content == 'ping') {
            msg.reply("pong");
        } else if(content.startsWith('list')) {
            let num = parseInt(content.slice(4));
            if(isNaN(num) || num==0) num = 5; 
            if(num > 10) num = 10;
            fs.readFile(eventFileName, encoding, function(err, data) {
                if(err) {
                    msg.reply("You should update first!");
                } else {         
                    let res = "\n";
                    let ctfTimeEvents = [];
                    let data_ = data.slice(2,-2).split("},{");
                    data_.forEach(function(elem,i){
                        ctfTimeEvents[i] = JSON.parse("{"+elem+"}");
                    });
                    for(var i = 0; i < num; i++){
                        res = res.concat("[",i+1,"] Title : ",ctfTimeEvents[i].title,"\n");
                        res = res.concat("[+] Date : ", ctfTimeEvents[i].date, "\n");
                        res = res.concat("[+] Weight : ", ctfTimeEvents[i].weight, "\n\n");
                    }
                    msg.reply(res);
                }
            });
        } else if(content == 'update') {
            let ctfEvents = await getCTFTimeEvents(); 
            let data = JSON.stringify(ctfEvents);
            fs.writeFile(eventFileName, data, encoding, function(err){
                if(err) console.log(err);
                else msg.reply("List Updated Successfully!");
            })
        } else if(content == 'cat flag') {
            msg.reply("PLUS{D0_y0u_l0v3_c47?_1_l0v3_c47_t000!\_:>}");
        }
    }
});

client.login(token.token);