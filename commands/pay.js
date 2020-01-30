exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) return message.channel.send('תייג משהו אני לא מחלק כסף אוטמטי')
  if (user.bot === true) return message.channel.send('תודה על הנדיבות אבל אני בוט מה אני יעשה עם כסף')
  if (!args[1]) return message.channel.send('?כמה להעביר')
  if (message.mentions.users.first() === message.author) return message.channel.send('חמדן מגעיל מה חשבת להעביר לעצמך')
  if (isNaN(args[1])) return message.channel.send('סכום לא תקין')
  
  client.money.ensure(`${message.author.id}`, {
    user: message.author.id,
    money: 0
  })
  
  const yourMoney = client.money.get(`${message.author.id}`, 'money')
  if (yourMoney < args[1]) return message.channel.send('חחחחחחח אין לך מספיק יגיי')

  client.money.ensure(`${user.id}`, {
    user: user.id,
    money: 0
  })

  const money = client.money.get(`${user.id}`, 'money')
  client.money.set(`${user.id}`, parseInt(money) + parseInt(args[1]), 'money')
  console.log(parseInt(money))
  console.log(parseInt(args[1]))
  console.log(parseInt(money) + parseInt(args[1]))
  client.money.set(`${message.author.id}`, parseInt(yourMoney) - parseInt(args[1]), 'money')
  message.channel.send(`העברת **${user}** \`${parseInt(args[1])}\`\n**${user}'s סכום של:** ₪${parseInt(args[1])}\n**יתרה נוכחית:** $${parseInt(yourMoney) - parseInt(args[1])}`)
}

exports.conf = {
  enabled: true,
  aliases: ['מכור', 'שלם', 'העבר', 'תרומה', 'תרום'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'תרומה',
  category: 'הימורים',
  description: 'תרום לחבר',
  usage: 'רשום העבר או מכור או תרום ואז תייג משהו עם @ ואל תשכח תסכום'
}
