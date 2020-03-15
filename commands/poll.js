const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const yesEmoji = '👍'
  const noEmoji = '👎'
  const emojis = message.client.emojis.get('640480680576417803')
  const settings = client.getSettings(message.guild.id)
  const input = message.content.split(`${settings.prefix}הצבעה `)

  const embed = new Discord.RichEmbed()
    .setTitle('🗳 הצבעה')
    .setColor(colors.default)
    .addField(`תצביע עם 👍 או ${noEmoji} או תוסיף אחד לטעמך`, input, true)
    .setTimestamp()

  if (args.length === 0) {
    message.channel.send(`על מה תיהיה ההצבעה? \nלדוגמה, \`${settings.prefix}האם מוריס גיי?\``)
  } else {
    message.delete()
    message.channel.send(embed).then(message => {
      message.react(yesEmoji)
        .then(() => message.react(noEmoji))
    })
  }
}

exports.conf = {
  enabled: true,
  aliases: ['שאל','הצבעה','סקר'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'סקר',
  category: 'כלים',
  description: 'משאל עם, סקר, הצבעה. קרא לזה איך שאתה רוצה',
  usage: 'רשום סקר או שאל או הצבעה והוסף תוכן'
}
