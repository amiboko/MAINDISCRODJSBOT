const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  request('https://dog.ceo/api/breeds/image/random', function (error, body) {
    var result = JSON.parse(body.body)
    const embed = new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage('https://raw.githubusercontent.com/amiboko/Gaymersbot/master/img/WhatsApp%20Image%202020-01-17%20at%2010.36.28.jpeg')

    message.channel.send(embed)
  })
}

exports.conf = {
  enabled: true,
  aliases: ['כלב', 'הודי', 'dog', 'puppy' ,'moris', 'morris', 'maurice' ,'מוריס'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מוריס',
  category: 'כיף',
  description: 'תרשום תשם של מוריס באנגלית ובעברית ותקבל תמונה של מוריס',
  usage: 'מוריס|כלב|הודי|dog|puppy|moris|morris|maurice'
}
