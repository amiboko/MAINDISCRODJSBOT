const Discord = require('discord.js')
const colors = require('../lib/colors.json')
exports.run = async (client, message, args, level) => {
  const prefix = message.guild === null ? '' : client.getSettings(message.guild.id).prefix
  const results = ['כן', 'לא', 'יש מצב']
  const result = results[Math.floor(Math.random() * results.length)]
  const input = args.join(' ')

  if (!input) {
    const embed = new Discord.RichEmbed()
      .setColor(colors.red)
      .setTitle('ערך לא תקין')
      .setDescription(`\`${prefix}[שאל [הודעה\`\n\nשאל שאלה תקבל תשובה,
      אם תשאל מי או מה אני יבחר הומו אקראי`)

    message.channel.send(embed)
  } else {
    if (message.content.includes('מי') || message.content.includes('מה')) {
      if (message.channel.type === 'dm') {
        const member = ['You.', 'Me.']
        const result = member[Math.floor(Math.random() * member.length)]
        message.channel.send(`${result}`)
      }
      var member = message.guild.members.random().displayName
      message.channel.send(` הומו  ${member} `)
    } else {
      message.channel.send(
        new Discord.RichEmbed()
          .setColor(colors.default)
          .addField("שאלה", input)
          .addField("תשובה", result)
          .setFooter('😂😂😂😂😂😂😂😂😂😂😂😂😂')
          .setImage(`https://media.tenor.com/images/8599601e72d0fac95cdbf6396094687f/tenor.gif`)
      )
    }
  }
}

exports.conf = {
  enabled: true,
  aliases: ['שאל'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'שאל',
  category: 'עזרים',
  description: 'שאל אותי שאלה ידבע',
  usage: 'שאל <שאלה>'
}
