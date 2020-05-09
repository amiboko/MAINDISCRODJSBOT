const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  const voiceChannel = message.member.voiceChannel
  message.delete();
  
  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/botsound.mp3', {volume: 0.9,});
      await dispatcher.on('end', function () { 

          setTimeout(function () { voiceChannel.leave();}, 5000);

          for (let member of voiceChannel.members) {member[1].setMute(false)}
      });

      });

  }
  
       let timer = 10000;
       if (!voiceChannel) return message.reply('**ככה אתה מקלל, אתה יודע מה, אם אתה כזה גבר כנס לשיחה ותכתוב את זה שוב**')
       for (let member of voiceChannel.members) {member[1].setMute(true)}
       for (let member of voiceChannel.members) {member[1].setDeaf(false)}

       voiceChannel.join()
       
      const embed2 = new Discord.RichEmbed()
      .setTitle('שים אוזניות ופול ווליום\n יש לנו שיחת נהלים קצרה...')
      .setColor("#FF0000")
      .addField('🔇')
      .setTimestamp()
      
      message.channel.send(embed2).then(message => message.delete(120000)).catch(console.error);
     
      setTimeout(function () { play(voiceChannel); }, timer);

};

exports.conf = {
  enabled: true,
  aliases: ['שתוק'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליי',
  category: 'כיף',
  description: 'כנס לשיחה ותרשום שתוק אם אתה גבר',
  usage: 'שתוק'
}
