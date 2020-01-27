const Discord = require('discord.js')
const colors = require('../lib/colors.json')
const moment = require('moment')
const version = require('discord.js')
require('moment-duration-format')

exports.run = (client, message, args, level) => {
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')
  const embed = new Discord.RichEmbed()
    .setAuthor('מי אני')
    .setColor(colors.default)
    .setThumbnail(client.user.avatarURL)
    .addField('סהכ הרשאות', message.client.guilds.size, true)
    .addField('סהכ משתמשים', `${message.client.users.size}`, true)
    .addField('מספר ברזל', `${message.client.user.id}`, true)
    .addField('דומיין', '🇮🇱 ISRHELL', true)
    .addField('זמן אוויר', `${duration}`, true)
    .addField('נוצר ע"י', '<@524302700695912506>', true)
    .addField('לינק לשרת', '[בולבול] (https://discord.gg/NsxPXy)')
    .setTimestamp()
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['בוט'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'בוט',
  category: 'עזרים',
  description: 'קצת פרטים על הבוט',
  usage: 'בוט'
}
