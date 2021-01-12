const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix

  try {
    if (!args[0]) {
      const embed = new Discord.RichEmbed()
      .setTitle('GAMERS UNITED RULES')
      .addField(`תקללו חופשי רק קחו בחשבון שלי מותר הכל`,'➖➖➖➖➖➖➖➖➖➖')
      .addField(`יש לי פתיל קצר אז בלי חפירות בבקשה`,'➖➖➖➖➖➖➖➖➖➖')
      .addField(`גזענות לא מתקבלת על הדעת (לא תופס על תיימנים)`,'➖➖➖➖➖➖➖➖➖➖')
      .addField(`צריכים עזרה? רשמו עזרה או פקודות בערוץ MAIN ותקבלו באהבה`,'➖➖➖➖➖➖➖➖➖➖')
      .setDescription(`ברוכים הבאים לערוץ שלנו \n כמה כללים חשובים\n`)
  		.setColor(colors.default)
			.setThumbnail(client.user.avatarURL)
			.addField('רוצים להזמין עוד משהוא לשרת?', '[CLICK ME](https://discord.gg/RcHes6y)')
			.setImage("https://scontent.fhfa2-2.fna.fbcdn.net/v/t1.0-9/s960x960/81214613_1397300473812746_7875231392332775424_o.jpg?_nc_cat=109&_nc_ohc=2mjhu9slCRgAX-QuI0n&_nc_ht=scontent.fhfa2-2.fna&_nc_tp=1002&oh=209fde4a212c3de86dcf387e57fec1c0&oe=5E9ACFDF")

      message.channel.send(embed)
    } else {
      // Show individual command/alias/category's help
      let command = args[0]
      if (client.commands.has(command) || client.aliases.has(command)) {
        command = client.commands.get(command) || client.aliases.get(command)

        const embedTiny = new Discord.RichEmbed()
	      	.setTitle(`תפריט עזרה - ${prefix}${command.help.name}`)
	      	.setColor(colors.default)
          .setThumbnail(client.user.avatarURL)
          .setDescription(`${command.help.description}\n\n**שימוש:** ${command.help.usage}\n`)
	      	.addField('רמת הרשאה', `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
          .addField('קטגוריה', command.help.category, true)
          .addField('רשאי', command.conf.guildOnly ? 'כן' : 'לא', true)

        message.channel.send(embedTiny)
      } else {
        const currentCategory = ''
        let output = ''
        const userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level)

        const sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
        sorted.forEach(c => {
          const cat = c.help.category.toLowerCase()
          if (cat == args[0].toLowerCase()) {
            if (level < client.levelCache[c.conf.permLevel]) return
            output += '`' + c.help.name + '` '
          }
        })

        if (!output) return message.reply('פקודה לא תקינה')
      }
    }
  } catch (err) {
    message.channel.send('שגיאה, פנה לעמי\n' + err.stack).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['עזרה', 'help'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'עזרה',
  category: 'כלים',
  description: 'מציג עזרה לכל פקודה מכל קטגוריה לפי בחירה',
  usage: 'עזרה <פקודות>'
}
