const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const embed = new Discord.RichEmbed()
    .setColor(colors.default)
    .setImage(`${message.author.displayAvatarURL}`)
    .addField(':הלוגו שלך', `[קניל](${message.author.displayAvatarURL})`, true)

  if (!message.mentions.users.size) {
    return message.channel.send(embed)
  }

  const user = message.mentions.users.first() || message.author
  const embed2 = new Discord.RichEmbed()
    .setColor(colors.default)
    .setImage(`${user.displayAvatarURL}`)
    .setThumbnail(`${user.displayAvatarURL}`)
    .addField(`${user.username}' לוגו`, `${user.displayAvatarURL}`, true)

  message.channel.send(embed2)
}

exports.conf = {
  enabled: true,
  aliases: ['לוגו'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'לוגו',
  category: 'עזרים',
  description: 'מציג את הלוגו שלך',
  usage: 'רשום לוגו'
}
