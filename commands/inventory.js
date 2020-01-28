const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  const key = `${message.author.id}`
  
  client.inventory.ensure(key, {
    member: key,
    dildo: 0,
    iphone: 0,
    green: 0,
    ring: 0,
    lambo: 0,
  })
  
  const embed = new Discord.RichEmbed()
    .setTitle('רשימת המחסן הפרטי שלי')
    .setColor(colors.default)
    .addField(`💍 טבעת`, client.inventory.get(key, 'ring'))
    .addField(`🍆 דילדו`, client.inventory.get(key, 'dildo'))
    .addField(`🌿 ירוק`, client.inventory.get(key, 'green'))
    .addField(`🔞 קונדום`, client.inventory.get(key, 'condom'))
    .addField(`🏎️ למבורגיני` , 'היית מת שיהיה לך')
    .setFooter(`${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['מחסן', 'תיק', 'ארון', 'שקית'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מחסן',
  category: 'הימורים',
  description: 'מציג רשימת המחסן הפרטי שלי',
  usage: 'רשום מחסן או ארון או שקית או תיק'
}
