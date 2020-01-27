const ms = require('ms')
exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

  client.cooldown.ensure(`${message.author.id}`, {
    member: message.author.id,
    dailbonusy: 0,
    rep: 0
  })
  
  const cooldown = client.cooldown.get(message.author.id, 'dailybonus')
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
  if (cooldown === date) return message.channel.send(`כבר לקחת מתנה אל תיהיה חמדן`)
  
  client.cooldown.set(`${message.author.id}`, date, 'dailybonus') // Activate 24 hour cooldown
  
  client.money.ensure(`${message.author.id}`, {
    member: message.author.id,
    money: 0
  })

  const money = client.money.get(message.author.id, 'money')
  client.money.set(`${message.author.id}`, money + 100, 'money')
  message.channel.send(`קיבלת בונוס יומי של \`${100}שקל\`!`)
}

exports.conf = {
  enabled: true,
  aliases: ['מתנה', 'בונוס', 'אסוף'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מתנה',
  category: 'הימורים',
  description: 'קבל בונוס יומי כל 24 שעות',
  usage: 'מתנה'
}
