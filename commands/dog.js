const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  request('https://dog.ceo/api/breeds/image/random', function (error, body) {
    var result = JSON.parse(body.body)
    const embed = new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/MORIS.jpg')

    message.channel.send(embed)
  })
}

exports.conf = {
  enabled: true,
  aliases: ['כלב', 'הודי', 'dog', 'puppy' ,'moris', 'morris', 'maurice' ,'שחור','מוריס','BLACK'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מוריס',
  category: 'כיף',
  description: 'תרשום תשם של מוריס באנגלית ובעברית ותקבל תמונה של מוריס',
  usage: 'רשום מוריס או מוריס באנגלית'
}
