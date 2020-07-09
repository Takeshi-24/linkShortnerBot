const { Telegraf } = require('telegraf')
const request = require('request')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome! just send url to shrink.'))

bot.help((ctx) => ctx.reply('just send the url to be shrinked Eg: https://www.miramax.com/movie/pulp-fiction/'))

bot.on('message',(ctx) => {
    var searchQuery = ctx.message.text
    var options = {
        method: 'POST',
        url: process.env.API_URL,
        headers: {
          'x-rapidapi-host': 'url-shortener-service.p.rapidapi.com',
          'x-rapidapi-key': process.env.API_KEY,
          'content-type': 'application/x-www-form-urlencoded',
          useQueryString: true
        },
        form: {url: searchQuery}
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        link = JSON.parse(body)
        ctx.reply(link["result_url"])
      });
})

bot.launch()

