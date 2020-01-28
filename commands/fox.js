const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  
    const embed = new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage('https://raw.githubusercontent.com/amiboko/Gaymersbot/master/img/WhatsApp%20Image%202020-01-17%20at%2010.36.27.jpeg')

    message.channel.send(embed)
  
}

exports.conf = {
  enabled: true,
  aliases: ['אלכס', 'alex'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'אלכס',
  category: 'כיף',
  description: 'מציג תמונה של אלכס',
  usage: 'תרשום אלכס או אלכס באנגלית'
}
