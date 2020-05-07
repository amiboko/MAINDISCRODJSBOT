const Discord = require('discord.js')
const ms = require('ms')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
  const reminderTime = args[0]
  if (!reminderTime) {
    const embed = new Discord.RichEmbed()
      .setColor(colors.red)
      .setTitle('לא מדויק! קח דוגמה; תזכורת 10000 יאלה בוא משחק')
      .setDescription("`10000 מייצג 10 שניות במאיות השניה`\n\n")

    message.channel.send(embed)
  }

  const reminder = args.slice(1).join(' ')

  if (reminder) {
    const success = new Discord.RichEmbed()
      .setColor(colors.green)
      .setTitle('**תזכורת התקבלה**')
      .setDescription(`שולח לך הודעה פרטית בעוד **${reminderTime}מאיות השניה!**`)
      .setTimestamp()

    const fail = new Discord.RichEmbed()
      .setColor(colors.red)
      .setTitle('**נכשל**')
      .setDescription('משהו בהגדרות אצלך לא תקין, תבדוק אם האופציה להודעות פרטיות פעיל')
      .setTimestamp()

    message.channel.send(success)

    setTimeout(function () {
      const remindEmbed = new Discord.RichEmbed()
        .setColor(colors.default)
        .addField('**תזכורת**', `${reminder}`)
        .setTimestamp()

      message.author.send(remindEmbed)
        .catch(() => message.channel.send(fail))
    }, ms(reminderTime))
  } else {
    message.channel.send('תזכיר לי להזכיר לך שאתה מטומטם טוב?')
  }
}

exports.conf = {
  enabled: true,
  aliases: ['תזכיר', 'תזכורת'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'תזכורת',
  category: 'כלים',
  description: 'תזכורת לכל מה שבא לך בכל זמן נתון',
  usage: 'תזכורת 10000 כבה את הדוד'
}
