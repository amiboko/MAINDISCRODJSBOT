const Discord = require('discord.js')
const request = require('request')



exports.run = async (client, message, args, level) => {
  let factsuseless = 
  [

      "אתה בא לחלע?!",
      "יש משחק?!",
      "אני חם!",
      "בוא נפרק!",
      "WARZONE?",
      "BR כן?!",

  ];

  let factnum = Math.floor((Math.random() * factsuseless.length));

  let factembed = new Discord.RichEmbed()
  //.setAuthor(message.author.tag)
  .setColor("#000000")
  .setTitle(factsuseless[factnum])
  .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/RONICOD.gif')


  if(message.content.includes('COD')) {
    if (message.author.bot) return;
      message.channel.send(factembed)
      
  }

  if(message.content.includes('cod')) {
    if (message.author.bot) return;
      message.channel.send(factembed)
      
  }
  // message.channel.send(factembed)  

}

exports.conf = {
  enabled: true,
  aliases: ['רוני'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'קוד',
  category: 'כיף',
  description: 'אני אוהב קוד',
  usage: 'קוד'
}
