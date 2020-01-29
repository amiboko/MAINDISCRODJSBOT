const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  
  const embed = new Discord.RichEmbed()
    .setTitle('🛒 החנות שלי')
    .setDescription(` \`${prefix} רשימת מוצרים\``)
    .setColor(colors.default)
    .addField('🍆 (₪100) דילדו',  `\`${prefix}יש להיעזר במבוגר אחראי\``, true)
    .addField('💍 (₪10000) טבעת', `\`${prefix}?!גיימרים צריכים להתחתן לא\``, true)
    .addField('🌿 (₪50) ירוק', `\`${prefix}קצת סטלה לא תזיק\``, true)
    .addField('🔞 (₪10) קונדום ',  `\`${prefix}יש פה מספיק ילדים\``, true)
    .addField('🏎️ (₪10,000,000) למבורגיני', `\`${prefix}נראה אותך קונה אותי\``, true)
    .setFooter(`${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['חנות'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'חנות',
  category: 'הימורים',
  description: 'רשימת מוצרים מהחנות שלי',
  usage: 'חנות'
}
