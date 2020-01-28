const Discord = require('discord.js')

exports.run = async (client, message, let, args, level) => {

  let foodList = ["`פיצה`","`מקדונלדס`","`KFC`","`BBB`","`חזיר`","`שרימפס`","`סושי`","`חטיף`","`בננה`","`סמים`","`זיין`","`בולבול`"];

  let pickfood = Math.floor((Math.random() * foodList.length));
  const hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6) 
  const color = !args[0] ? hex : args[0]
  let webembed = new Discord.RichEmbed()
  .setColor(hex)
  .addField("לך תאכל", foodList[pickfood])
  
  message.channel.send(webembed);
}

exports.conf = {
  enabled: true,
  aliases: ['רעב','אוכל','לאכול'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'מזון',
  category: 'כיף',
  description: 'אני יעזור לך מה לאכול',
  usage: 'רשום רעב או אוכל או לאכול'
}
