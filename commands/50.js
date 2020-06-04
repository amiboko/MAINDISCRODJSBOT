const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  message.channel.send(
    new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/MOSHE2.gif')
  )
}

exports.conf = {
  enabled: true,
  aliases: ['מושיקו'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'משה',
  category: 'כיף',
  description: 'גיף של משה',
  usage: 'רשום משה'
}
