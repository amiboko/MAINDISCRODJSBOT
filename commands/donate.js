const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const embed = new Discord.RichEmbed()
    .setTitle('💰 תרומה')
    .setColor(colors.default)
    .setThumbnail('טסט')
    .addField('טסט')
    .addField('טסט')

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['תרומה','תרום'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'NONE',
  category: 'NONE',
  description: 'בבנייה',
  usage: 'טסט'
}
