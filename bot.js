const Telegraf = require('telegraf')
const http = require('http');
require('dotenv').config();
const bot = new Telegraf(process.env.Token);
var rp = require('request-promise'); 

buyprice: '';
sellprice: '';
bot.start((ctx) => ctx.reply('Welcome to the Monis Bot,enter /help to know supported command'));
bot.command('help',(ctx) => ctx.reply('/inr to know price of Bitcoin in INR /usd to know selling price of Bitcoin in USD'))
bot.command('inr', ctx => {
    var inr = {
        uri: 'https://api.coindesk.com/v1/bpi/currentprice/INR.json',
        json: true
    };
    rp(inr)
        .then(function (repos) {
            console.log('INR',repos.bpi.INR.rate);
            var str = repos.bpi.INR.rate;
            var res = str.split(".");
            var INR =   '₹ ' + res[0];
            ctx.reply(INR);
        })
        .catch(function (err) {
           console.log('Unable to submit api')
        });
    LogCtx(ctx);
});
bot.command('usd', ctx => {
    var usd = {
        uri: 'https://api.coindesk.com/v1/bpi/currentprice/INR.json',
        json: true
    };
    rp(usd)
        .then(function (repos) {
            console.log('USD',repos.bpi.USD.rate);
            var str = repos.bpi.USD.rate;
            var res = str.split(".");
            var USD = '$'+res[0];
            ctx.reply(USD);
        })
        .catch(function (err) {
           console.log('Unable to submit api')
        });
    LogCtx(ctx);
});
bot.command('github', ctx => {
    ctx.reply('Hey check this project on my github - github.com/neelgeek/NeelBot');
    LogCtx(ctx);
})

bot.on("text", ctx => {
    ctx.reply('Hey,I dont support this feature still,but I am working on it !😎');
    LogCtx(ctx);
})

bot.on("sticker", ctx => {
    ctx.reply('Hey,I dont support this feature still,but I am working on it !😎');
    LogCtx(ctx);
})

bot.catch((err) => {
    console.log('Ooops', err)
})

function LogCtx(ctx) {
    console.log(ctx.message.text + " Sent by " + ctx.message.from.username);
}


function HTTPHandler(req, res) {
    console.log(req);
}

var port = process.env.PORT || 8000;
http.createServer(HTTPHandler).listen(port);
console.log("Running on port " + port);
bot.startPolling();