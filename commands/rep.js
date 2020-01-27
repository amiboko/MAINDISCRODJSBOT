exports.run = async (client, message, args) => {
  const user = message.mentions.users.first() || client.users.get(args[0])
  if (!user) return message.channel.send('תייג משהו')
  if (user.bot === true) return message.channel.send('אחי אני בוט מה נסגר איתך')

  if (user === message.author || message.author.id === user.id) return message.channel.send('תשמע אתה עף על עצמך חבל על הזמן')
  
  client.cooldown.ensure(`${message.author.id}`, {
    member: message.author.id,
    dailybonus: 0,
    rep: 0
  })
  
  const cooldown = client.cooldown.get(message.author.id, 'rep')
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
  if (cooldown === date) return message.channel.send(`ניתן לפנק כל 24שעות`)

  // Ensure this user has gotten rep before
  client.reputation.ensure(`${user.id}`, {
    user: user.id,
    rep: 0
  })

  const rep = client.reputation.get(`${user.id}`, 'reputation')

  client.reputation.set(`${user.id}`, rep + 1, 'reputation')
  message.channel.send(`${user}פשששש! פירגנת ל`)
  client.cooldown.set(`${message.author.id}`, date, 'rep') // Activate 24 hour cooldown
}

exports.conf = {
  enabled: true,
  aliases: ['פרגן', 'פנק', 'כבוד'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'כבוד',
  category: 'הימורים',
  description: 'פרגן לחבר קצת כבוד',
  usage: 'פרגן | פנק | כבוד _@עמי'
}
