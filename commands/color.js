const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  try {
    const hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6)
    
    const color = !args[0] ? hex : args[0] 
    const embed = new Discord.RichEmbed()
      .setColor(hex)
      .setImage(`https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/clown.gif`)

    message.channel.send(embed)
  }
    
  catch (err) {
    message.channel.send('שגיאה שגיאתית, ספר לעמי\n' + err).catch()
  }
}

exports.conf = {
  enabled: true,
  aliases: ['נועם','יו','אמאלה','פחד','אבאלה','אבא','מפחיד'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מפחיד',
  category: 'כיף',
  description: 'ואלה מפחיד',
  usage: 'רשום מפחיד'
}
