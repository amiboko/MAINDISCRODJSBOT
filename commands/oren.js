const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  const voiceChannel = message.member.voiceChannel
  message.delete(100000);

  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/oren.mp3', {volume: 1.0,});
      await dispatcher.on('end', function () { 
          setTimeout(function () { voiceChannel.leave();}, 1000);
          for (let member of voiceChannel.members) {member[1].setMute(false)}
      });

      });

  }
       if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**')
       setTimeout(function () { play(voiceChannel); }, 1500);
       voiceChannel.join()
       
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .addField('🔇הושתק זמנית לניגון הקטע🔇', '<a:cooldoge:693846954073129051>')
      .setDescription(`${message.author}` +'\xa0' + 'ברוך הבא לנגן שלי' + '\n\n' + '`🔊 איפה אחיך יכול להיות אחי אם לא בעבודה 🔊`' + '\n\n')
      .setTimestamp()
      
      message.channel.send(embed2).then(message => message.delete(100000));

      let channel = message.member.voiceChannel;
      for (let member of channel.members) {
        member[1].setMute(true)    }
   
};


exports.conf = {
  enabled: true,
  aliases: ['פלייאורן'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פלייאורן',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פלייאורן'
}
