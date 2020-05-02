const Discord = require('discord.js')
const joke = require('one-liner-joke').getRandomJoke
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    message.channel.send(
      new Discord.RichEmbed()
        .setColor(colors.default)
        .setDescription(joke().body)
        .setFooter('😂😂😂😂😂😂😂😂😂😂',)
    )
  } catch (err) {
    message.channel.send(
      new Discord.RichEmbed()
        .setColor(colors.red)
        .addField('שגיאה, פנה לעמי', `${err}`)
    ).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['בדיחה', 'מצחיק', 'funny', 'lol'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'בדיחה',
  category: 'כיף',
  description: 'בדיחות רנדומליות באנגלית כי עברית שפה חרא',
  usage: 'רשום בדיחה או מצחיק'
}
