const colors = require('../lib/colors.json')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? ';;' : client.getSettings(message.guild.id).prefix
  
message.delete(120000);

  const embed = new Discord.RichEmbed()
    .setTitle('🎵MASTERBOT-TUBE🎵')
    .setDescription(` \`${prefix} רצועות ניגון\``)
    .setColor(colors.default)
    .addField('1',  '**פליימשה**', true)
    .addField('2', '**פליירוס**', true)
    .addField('3', '**פליימתן**', true)
    .addField('4',  '**פלייאורן**', true)
    .addField('5', '**בקרוב**', true)
    .setFooter(`${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send(embed)
  .then((msg)=> { 
    setTimeout(function(){
      msg.edit(message.author + 'אם תרצה אוכל להוסיף גם את שלך, תעלה אותם ותתייג אותי').then(msg.delete(60000));
    }, 60000)
  }); 


}

exports.conf = {
  enabled: true,
  aliases: ['שירים'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'שירים',
  category: 'כיף',
  description: 'רשימת השירים שלי',
  usage: 'שירים'
}
