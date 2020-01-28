exports.run = async (client, message, args, level) => {
  try {
    let sts

    client.money.ensure(message.author.id, {
      money: 0,
      בייצים: 250
    })

    const בייצים = client.money.get(message.author.id, 'בייצים')
    const money = client.money.get(message.author.id, 'money')

    if (args[0]) {
      if (client.money.get(message.author.id, 'בייצים') < Number(args[0])) return message.reply('אין לך מספיק בייצים למכירה!')
      else sts = Number(args[0])
    } else sts = client.money.get(message.author.id, 'בייצים')

    client.money.set(message.author.id, בייצים - sts, 'בייצים')
    client.money.set(message.author.id, money + Math.round(sts), 'money')

    message.channel.send('יש לך רק' + client.money.get(message.author.id, 'בייצים') + '!')
  } catch (err) {
    message.channel.send('\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: [''],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'NONE',
  category: 'NONE',
  description: 'מכירת בייצים',
  usage: 'מכור [כמה בייצים]'
}
