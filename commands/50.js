const Discord = require('discord.js')
const request = require('request')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  message.channel.send(
    new Discord.RichEmbed()
      .setColor(colors.default)
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/MOSHED-2020-3-7-10-43-13.gif')
  )
}

exports.conf = {
  enabled: true,
  aliases: ['מוזס', 'מושיקו', 'משה', 'MOSES', 'מושה', 'מוש', 'MOSHE', 'משהמשה', 'Moshe'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'משה',
  category: 'כיף',
  description: 'גיף של משה',
  usage: 'רשום משה'
}
