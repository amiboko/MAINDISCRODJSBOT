const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    const member = message.mentions.members.first()
    let user = ''
    if (member) user = message.mentions.members.first()
    if (!member) user = message.author
    
    client.life.ensure(user.id, {
      member: user.id,
      spouse: 0,
      job: 0
    })
    
    client.money.ensure(user.id, {
      member: user.id,
      money: 0
    })
    
    client.reputation.ensure(user.id, {
      member: user.id,
      reputation: 0
    })
    
    const married = client.life.get(user.id, 'spouse') === 0 ? 'רווק מסכן' : `<@${client.life.get(user.id, 'spouse')}>`

    const embed = new Discord.RichEmbed()
      .setTitle(`${user.tag}`)
      .addField(`ת.ז`, user.id, true)
      .addField(`משתמש נוצר`, user.createdAt, true)
      .addField(`סטטוס`, user.presence.status, true)
      .addField(`נשוי ל`, married, true)
      .addField(`מוניטין`, `+${client.reputation.get(user.id, 'reputation')}`, true)
      //.addField(`Job`, user.user, true)
      //.addField(`Achievements`, user.user, true)
      .setThumbnail(user.avatarURL)
      .setColor(colors.default)

    message.channel.send(embed)
  } catch (err) {
    message.channel.send('שגיאה, תייג את עמי\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['user', 'פרופיל', 'i', 'מיזה'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פרופיל',
  category: 'כלים',
  description: 'מציג פרטים על משתמש',
  usage: 'פרופיל | מיזה | user | i | whois'
}
