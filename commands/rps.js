const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  const input = args[0]
  if (input == 'אבן' || input == 'נייר' || input == 'מספריים') {
    const result = [
      'אבן',
      'נייר',
      'מספריים'
    ]

    const picker = Math.floor(Math.random() * result.length)
    if (input == 'אבן' && result[picker] == 'אבן') {
      message.channel.send('ואלה גם אני בחרתי :punch:\n**תיקו יהומו**!')
    } else if (input == 'נייר' && result[picker] == 'נייר') {
      message.channel.send('ואלה גם אני בחרתי :raised_hand:\n**תיקו יהומו**!')
    } else if (input == 'מספריים' && result[picker] == 'מספריים') {
      message.channel.send('ואלה גם אני בחרתי :v:\n**תיקו יהומו**!')
    }

    // If bot wins

    else if (input == 'מספריים' && result[picker] == 'אבן') {
      message.channel.send('בחרתי :punch:\n**ניצחתי**!')
    } else if (input == 'אבן' && result[picker] == 'נייר') {
      message.channel.send('בחרתי :raised_hand:\n**ניצחתי**!')
    } else if (input == 'נייר' && result[picker] == 'מספריים') {
      message.channel.send('בחרתי :v:\n**ניצחתי**!')
    }

    // If bot loses

    else if (input == 'אבן' && result[picker] == 'מספריים') {
      message.channel.send('בחרתי :v:\n**ניצחת יזיין**!')
    } else if (input == 'נייר' && result[picker] == 'אבן') {
      message.channel.send('בחרתי :punch:\n**ניצחת יזיין**!')
    } else if (input == 'מספריים' && result[picker] == 'נייר') {
      message.channel.send('בחרתי :raised_hand:\n**ניצחת יזיין**!')
    }
  } else {
    message.channel.send(`**ערך לא תקין:** ${prefix}באמא שלי הבוטית שאתה דבע`)
  }
}

exports.conf = {
  enabled: true,
  aliases: ['123'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: '123 - משחק',
  category: 'כיף',
  description: 'אבן נייר ומספריים הידוע',
  usage: 'רשום 123 ואז אבן או נייר או מספריים'
}
