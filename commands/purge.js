exports.run = async (client, message, args, level) => {
  try {
    let num

    if (!isNaN(args[0])) {
      num = parseInt(args[0])

      if (num <= 100 && num > 1) {
        message.delete()
        message.channel.bulkDelete(num)
      } else message.reply('אני מקבל רק בין 2ל100 הודעות למחיקה')
    } else {
      message.reply('מה לא הבנת?! אני יכול למחוק רק בין 2ל100')
    }
  } catch (err) {
    message.channel.send('שגיאה, פנה לעמי\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['מחק', 'נקה', 'מחיקה', 'del'],
  guildOnly: true,
  permLevel: 'Moderator'
}

exports.help = {
  name: 'מחיקה',
  category: 'מנהל',
  description: 'מוחק הודעות',
  usage: 'מחק | נקה | מחיקה 2-100'
}
