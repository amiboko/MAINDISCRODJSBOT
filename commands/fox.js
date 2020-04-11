const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  
    const embed = new Discord.RichEmbed()
      .setColor(colors.default)
      .setTitle('אלכס הוא אחלה גבר שבעולם')
      .setImage('')

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
