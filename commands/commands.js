const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix = message.guild === null ? '' : client.getSettings(message.guild.id).prefix
  try {
    if (!args[0]) {
      let currentCategory = ''

      let output = `Type ${prefix}commands <category> to view all commands in that category`
      const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)

      sorted.forEach(async c => {
        const cat = c.help.category
        if (currentCategory !== cat) {
          output += `\n**${prefix}commands ${cat.toLowerCase()}**`
          currentCategory = cat
        }
      })

      const embed = new Discord.RichEmbed()
      .setTitle('תפריט פקודות')
      .setColor(colors.default)
      .setFooter(`פקודה/פקודות/בוט "כלים"`)
      .setThumbnail(client.user.avatarURL)
      .addField(` ➖➖➖➖➖`, '`🔨 כלים 🔨`')
      .addField(` ➖➖➖➖➖`, '` 💲 הימורים 💲`')
      .addField(` ➖➖➖➖➖ `, '`🎲 כיף 🎲`')

      message.channel.send(embed)
    } else {
      let command = args[0]
      if (client.commands.has(command) || client.aliases.has(command)) {
        command = client.commands.get(command) || client.aliases.get(command)

        const embedTiny = new Discord.RichEmbed()
	      .setTitle(`עזרה - ${prefix}${command.help.name}`)
	      .setColor(colors.default)
          .setThumbnail(client.user.avatarURL)
          .setDescription(`${command.help.description}\n\n**שימוש:** ${command.help.usage}\n**עזרים:** ${command.conf.aliases.join(' | ') || 'ריק'}`)
	      .addField('רמה הרשאה', `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
          .addField('קטגוריה', command.help.category, true)
          .addField('רשאי', command.conf.guildOnly ? 'כן' : 'לא', true)

        message.channel.send(embedTiny)
      } else {
        const currentCategory = ''
        let output = ''

        const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
        sorted.forEach(c => {
          const cat = c.help.category.toLowerCase()
          if (cat == args[0].toLowerCase()) {
            if (level < client.levelCache[c.conf.permLevel]) return
            output += '`' + c.help.name + '\n' + '` '
          }
        })

        if (!output) return message.reply('אל תיהיה טיפש, תרשום בוט או פקודה ותקבל הכל מסודר ')
		 const embed = new Discord.RichEmbed()
	      .setTitle('תפריט פקודות')
	      .setColor(colors.default)
          .setThumbnail(client.user.avatarURL)
          .setDescription(output)

        message.channel.send(embed)
      }
    }
  } catch (err) {
    message.channel.send('שגיאה, פנה לעמי' + err.stack).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['פקודות', 'פקודה','בוט'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'פקודות',
  category: 'כלים',
  description: 'מציג אינפורמציה לגביי כל הפקודות',
  usage: 'רשום פקודות או פקודה ואז את שם הפקודה'
}
