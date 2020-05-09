const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  const voiceChannel = message.member.voiceChannel
  
  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/aniroze.mp3', {volume: 0.9,});
     
      await dispatcher.on('end', function () { 
        message.channel.send("🎧 **?נו אז איך היה הקטע של משה השראוד** 🎧").then(
          sentEmbed => {
          sentEmbed.react("👍")
          sentEmbed.react("👎")      } );
          setTimeout(function () { voiceChannel.leave(); }, 5000);
      });
      });
  }

       let timer = 10000;
  
       if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**')
       
        voiceChannel.join()
       
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .setDescription(`${message.author}` +'\xa0\xa0\xa0\xa0' + 'ברוך הבא לנגן שלי' + '\n\n' + 'תוך `10 שניות` תקבל את אחד הלהיטים של **משה השראוד**')
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setTimestamp()
      message.channel.send(embed2);
     
      setTimeout(function () { play(voiceChannel); }, timer);

};

exports.conf = {
  enabled: true,
  aliases: ['פליימשה'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליי',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פליי'
}
