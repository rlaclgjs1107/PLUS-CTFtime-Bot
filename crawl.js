const axios = require('axios');
const cheerio = require('cheerio');

async function getHTML() {
    try {
        return await axios.get("https://ctftime.org/event/list/upcoming");
    } catch (error) {
        console.log(error)
    }
}

async function getCTFTimeEvents() {
    let ctfTimeEvents = [];
    let html = await getHTML();
    const $ = cheerio.load(html.data);
    const ctf = $("table.table-striped tbody").children("tr");
    ctf.each(function(i,elem) {
        ctfTimeEvents[i] = {
            title : $(this).find("td a").text()
        };
    });
    return ctfTimeEvents;
}

module.exports = getCTFTimeEvents;