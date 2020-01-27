const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  try {
    const pingEmbed = new Discord.RichEmbed()
      .setColor(colors.default)
      .setFooter('פינג')
      .addField(`${message.author.id}`, 'שששששששלום')

    const msg = await message.channel.send(pingEmbed)

    const embed = new Discord.RichEmbed()
      .setColor(colors.default)
      .addField('התקבל תוך',
      `${msg.createdTimestamp - message.createdTimestamp}ms`)
      // .addField('WebSocket\nHeartbeat',
      // `${Math.floor(client.pings[0])}ms`, true)
      // .addField('Average WebSocket\nHeartbeat',
      // `${Math.floor(client.pings.average())}ms`, true)

    msg.edit(embed)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['פינג','פונג','פ'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'פינג',
  category: 'כלים',
  description: 'מחזיר פונג',
  usage: 'פינג | פ | פונג'
}
