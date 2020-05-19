const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = (client, message, args, level) => {

  client.money.ensure(`${message.author.id}`, {
    member: message.author.id,
    money: 0
  })
  const money = client.money.get(message.author.id, 'money')
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
      message.channel.send('בחרתי :v:\n\n**ניצחת יזיין**!\n\n  וגם זכית ב₪1000 💰')

      client.money.set(`${message.author.id}`, money + 1000, 'money')
      
    } else if (input == 'נייר' && result[picker] == 'אבן') {
      message.channel.send('בחרתי :punch:\n\n**ניצחת יזיין**!\n\n  וגם זכית ב₪1000 💰')

      client.money.set(`${message.author.id}`, money + 1000, 'money')

    } else if (input == 'מספריים' && result[picker] == 'נייר') {

      message.channel.send(`בחרתי :raised_hand:\n\n**ניצחת יזיין**!\n\n  וגם זכית ב₪1000 💰`)
      
      client.money.set(`${message.author.id}`, money + 1000, 'money')

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
  name: '123',
  category: 'הימורים',
  description: 'אבן נייר ומספריים הידוע עם טוייסט בעלילה',
  usage: 'רשום 123 ואז אבן או נייר או מספריים'
}
