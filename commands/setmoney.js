exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) return message.channel.send('תייג משהוא')
  if (user.bot === true) return message.channel.send('לא רוצה')
  if (!args[1]) return message.channel.send('כמה להעביר')
  if (isNaN(args[1])) return message.channel.send('סכום לא תקין')

  client.money.ensure(`${user.id}`, {
    user: user.id,
    money: 0
  })

  const money = client.money.get(`${user.id}`, 'money')
  client.money.set(`${user.id}`, parseInt(args[1]), 'money')
  message.channel.send(`בוצעה העברה בנקאית על סך \`₪${args[1]}\`\n**${user} יתרתך החדשה היא** ₪${parseInt(args[1])}`)
}

exports.conf = {
  enabled: true,
  aliases: ['בנק'],
  guildOnly: true,
  permLevel: 'Bot Moderator'
}

exports.help = {
  name: 'בנק',
  category: 'מנהל',
  description: 'הבנק של הבוט בלבד',
  usage: 'בנק מוריס 5'
}
