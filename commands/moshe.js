const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  const voiceChannel = message.member.voiceChannel
  
  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/moshe.mp3', {volume: 1.0,});
      await dispatcher.on('end', function () { 
          setTimeout(function () { voiceChannel.leave();}, 5000);
          for (let member of voiceChannel.members) {member[1].setMute(false)}
      });

      });

  }
       if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**').then(message => message.delete(120000));
       voiceChannel.join()
       
      const embed2 = new Discord.RichEmbed()
      .setTitle('🔇')
      .setColor("#3498DB")
      .setDescription(`${message.author}` +'\xa0' + 'מצטרף רגע את חברה שלי יש לה משהו לומר למשה ...')
      
      message.channel.send(embed2).then(message => message.delete(300000));
           setTimeout(function () { play(voiceChannel); }, 5000);
           for (let member of voiceChannel.members) {
            member[1].setMute(true)    }
};

exports.conf = {
  enabled: true,
  aliases: ['פליימשה','משה'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליימשה',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פליי'
}
