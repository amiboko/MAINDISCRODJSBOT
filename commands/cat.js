const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  message.channel.send(
    new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage('https://raw.githubusercontent.com/amiboko/Gaymersbot/master/img/poran.jpg')
  )
}

exports.conf = {
  enabled: true,
  aliases: ['פורן', 'פורני', 'porn', 'poran'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'פורן',
  category: 'כיף',
  description: 'תמונה של פורן',
  usage: 'פורן porn poran פורני'
}
