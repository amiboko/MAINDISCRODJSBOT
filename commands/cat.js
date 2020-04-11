const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  message.channel.send(
    new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/poran.jpg')
  )
}

exports.conf = {
  enabled: true,
  aliases: ['פורן', 'פורני', 'פורנו', 'PORN', 'porn'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'פורן',
  category: 'כיף',
  description: 'תמונה של פורן',
  usage: 'רשום פורן או פורני או פורנו '
}
