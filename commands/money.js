exports.run = async (client, message, args) => {
  const key = `${message.author.id}`

  client.money.ensure(`${message.author.id}`, {
    member: message.author.id,
    money: 0
  })

  const money = client.money.get(key, 'money')

  message.channel.send(`יתרה נוכחית ₪${money}`)
}

exports.conf = {
  enabled: true,
  aliases: ['כסף', 'עשיר', '$', 'ארנק', 'ויזה'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'כסף',
  category: 'הימורים',
  description: 'כמה כסף יש לך',
  usage: 'כסף | ארנק | ויזה | עשיר'
}
