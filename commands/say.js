exports.run = async (client, message, args, level) => {
  try {
    message.delete().catch()
    const mg = args.join(' ')
    message.channel.send(mg)
  } catch (err) {
    message.channel.send('שגיאהההה, תייג את עמי\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['1','שלח'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'שלח',
  category: 'מנהל',
  description: 'שולח הודעה בשמי',
  usage: 'שלח _ אני זיין'
}
