const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  const voiceChannel = message.member.voiceChannel

  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/roslan.mp3', {volume: 1.0,});
      await dispatcher.on('end', function () { 
          setTimeout(function () { voiceChannel.leave();}, 5000);
          for (let member of voiceChannel.members) {member[1].setMute(false)}
      });

      });

  }
       if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**').then(message => message.delete(120000));
       setTimeout(function () { play(voiceChannel); }, 5000);
       voiceChannel.join()
       
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .addField('הערוץ 🔇 זמנית לניגון הקטע', '<a:cooldoge:693846954073129051>')
      .setDescription(`${message.author}` +'\xa0' + 'ברוך הבא לנגן שלי' + '\n\n' + '`🔊 5 שניות לניגון הלהיט של רוסלנה  🔊`' + '\n\n')
      .setTimestamp()
      
      message.channel.send(embed2).then(message => message.delete(300000));

      let channel = message.member.voiceChannel;
      for (let member of channel.members) {
        member[1].setMute(true)    }
   
};

exports.conf = {
  enabled: true,
  aliases: ['פליירוסלן','פליירוס'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליירוס',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פליי'
}
