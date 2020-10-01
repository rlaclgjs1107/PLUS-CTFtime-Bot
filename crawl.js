const axios = require('axios');
const cheerio = require('cheerio');

async function getHTML() {
    try {
        return await axios.get("https://ctftime.org/event/list/upcoming", {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'}});
    } catch (error) {
        console.log(error)
    }
}

async function getCTFTimeEvents() {
    let idx = 0;
    let ctfTimeEvents = [];
    let html = await getHTML();
    const $ = cheerio.load(html.data);
    const ctf = $("table.table-striped tbody").children("tr");
    ctf.each(function(i,elem) {
        if($(this).find("td a").text()!=""){
            let detail = $(this).html().replace(/<\/td>/gi, "").split("<td>");
            ctfTimeEvents[idx] = {
                title : $(this).find("td a").text(),
                date : detail[2].replace(/&#x2014;/gi, "-"),
                format : detail[3],
                weight : detail[5]
            };
            idx += 1;
        }
    });
    return ctfTimeEvents;
}

module.exports = getCTFTimeEvents;