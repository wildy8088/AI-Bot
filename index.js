/*
----------------------------------------------------------------------------
 Name         : AI-Bot
 Version      : 1.0.0
 Desc         : AI-Bot - A Whatsap bot using OpenAI Library
 Author       : Wildy Sheverando [ github.com/wildy8088 ]
 Date         : 06-02-2023
 License      : GNU General Public License V3
 License Link : https://raw.githubusercontent.com/wildy8088/lcn/main/gplv3
----------------------------------------------------------------------------
*/

let config = require("./config.json");
const figlet = require('figlet');
const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')
const { Configuration, OpenAIApi } = require("openai")
const client = new Client({puppeteer: {args: ['--no-sandbox'],},
authStrategy: new LocalAuth(),});
const Prefix = config.prefix;

console.log("Connecting to whatsapp..");

client.on('qr', qr => {
    console.clear();
    console.log("Scan this QR Code to login");
    qrcode.generate(qr, {small: true});
});

client.on("authenticated", (session) => {
    console.clear();
    console.log("Success Login to whatsapp !");
  });

client.on('ready', () => {
    console.clear();
    console.log(figlet.textSync("Wildy8088"));
    console.log("")
    console.log("             AI-Bot | OpenAI Bot For WhatsApp")
    console.log("          Author : Wildy Sheverando [Wildy8088]")
    console.log("                     Version 1.0.0")
    console.log("")
    console.log('[LOG] AI-Bot has been started !');
});

client.on("message", async (message) => {
    try {
        // Random API In Config
        randombos = Math.floor(Math.random() * config.totalapi) + 1;

        // OpenAI Configuration and Create new OpenAI Session
        const configuration = new Configuration({apiKey: config[`apikey${randombos}`],});
        const openai = new OpenAIApi(configuration);

        // This for Client contact
        let kontak = await message.getContact();
        
        // This Private Mode
        if(config.privatemode == '1') {
            // This is for group
            if((await message.getChat()).isGroup) {
                if(message.body.startsWith(Prefix)) {
                    if(config.ownernumber == `${kontak.number}`) {
                        let kontak = await message.getContact();
                        const message2 = message.body.replace(`${Prefix} `, "");
                        const response = await openai.createCompletion({ model: "text-davinci-003", prompt: message2, temperature: 0, max_tokens: 1000, top_p: 1, frequency_penalty: 0.2, presence_penalty: 0, });
                        const hasilreturn = response.data.choices[0].text;
                        let hasilreturn2 = hasilreturn.trimStart();
                        console.log(`[LOG] | [PRVACC] | [GROUP] | API${randombos} | Message : ${message.body} | From (${kontak.number})/(${kontak.pushname})`)
                        message.reply(hasilreturn2);
                    } else {
                        console.log(`[LOG] | [PRVACC] | [GROUP] | NoAccess | Message : ${message.body} | From (${kontak.number})/(${kontak.pushname})`)
                        message.reply("Mohon maaf anda tidak memiliki akses ke bot");
                    }
                }
            // This is for private chat
            } else {
                if(config.ownernumber == `${kontak.number}`) {
                    let kontak = await message.getContact();
                    const message2 = message.body.replace(`${Prefix} `, "");
                    const response = await openai.createCompletion({ model: "text-davinci-003", prompt: message2, temperature: 0, max_tokens: 1000, top_p: 1, frequency_penalty: 0.2, presence_penalty: 0, });
                    const hasilreturn = response.data.choices[0].text;
                    let hasilreturn2 = hasilreturn.trimStart();
                    console.log(`[LOG] | [PRVACC] | [PRIVATE] | API${randombos} | Message : ${message.body} | From (${kontak.number})/(${kontak.pushname})`)
                    message.reply(hasilreturn2);
                } else {
                    console.log(`[LOG] | [PRVACC] | [PRIVATE] | NoAccess | Message : ${message.body} | From (${kontak.number})/(${kontak.pushname})`)
                    message.reply("Mohon maaf anda tidak memiliki akses ke bot");
                }
            }
        // This Public Mode
        } else {
            // This for group
            if((await message.getChat()).isGroup) {
                if(message.body.startsWith(Prefix)) {
                    const message2 = message.body.replace(`${Prefix} `, "");
                    const response = await openai.createCompletion({ model: "text-davinci-003", prompt: message2, temperature: 0, max_tokens: 1000, top_p: 1, frequency_penalty: 0.2, presence_penalty: 0, });
                    const hasilreturn = response.data.choices[0].text;
                    let hasilreturn2 = hasilreturn.trimStart();
                    console.log(`[LOG] | [PUBACC] | [GROUP] | API${randombos} | Message : ${message.body} | From (${kontak.number})/(${kontak.pushname})`)
                    message.reply(hasilreturn2);
                }
            // This For Private Chat
            } else {
                    const message2 = message.body.replace(`${Prefix} `, "");
                    const response = await openai.createCompletion({ model: "text-davinci-003", prompt: message2, temperature: 0, max_tokens: 1000, top_p: 1, frequency_penalty: 0.2, presence_penalty: 0, });
                    const hasilreturn = response.data.choices[0].text;
                    let hasilreturn2 = hasilreturn.trimStart();
                    console.log(`[LOG] | [PUBACC] | [PRIVATE] | API${randombos} | Message : ${message.body} | From (${kontak.number})/(${kontak.pushname})`)
                    message.reply(hasilreturn2);
            }
        }
    } catch (err) {
        console.log(err)
    } 
});

client.initialize();
