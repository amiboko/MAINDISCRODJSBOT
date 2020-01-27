exports.run = async (client, message, args, level) => {
  try {
    const friendly = client.config.permLevels.find(l => l.level === level).name
    message.reply(`רמת ההרשאה שלך היא ${level} (${friendly}).`)
  } catch (err) {
    message.channel.send('שגיאה, תייג את עמי\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['הרשאה'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'הרשאה',
  category: 'כלים',
  description: 'רמת הרשאה שלך',
  usage: 'הרשאה'
}
