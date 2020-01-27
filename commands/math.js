const math = require('mathjs')

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.reply('תן משוואה')

    message.channel.send('תוצאה: ' +  math.eval(args.join(' ')))
  } catch (err) {
    message.channel.send('שגיאה, תייג את עמי\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['חשבון', 'חשב', 'מחשבון', 'כמהזה'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מחשבון',
  category: 'כלים',
  description: 'מחשב את החישוב של המחשבון',
  usage: 'כמהזה | מחשבון | חשבון | חשב _10+10'
}
