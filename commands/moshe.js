const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  const voiceChannel = message.member.voiceChannel
  
  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/aniroze.mp3' , {volume: 0.8,});
      await dispatcher.on('end', function () { 

        message.channel.send("🎧 **?נו אז איך היה הקטע של משה השראוד** 🎧").then(
          sentEmbed => {
          sentEmbed.react("👍")
          sentEmbed.react("👎")
        
          voiceChannel.leave();} );
      });
  });
  }

  let timer = 10000;
       if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**')
        voiceChannel.join()
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .setDescription(`${message.author}` + '\n\n' + 'תתחבר לערוץ שיחה תוך 10 שניות' + '\n\n' + 'ואני בדרך אליך עם אחד הקטעים החזקים של **משה השראוד**')
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setTimestamp()
      message.channel.send(embed2);
      
      setTimeout(function () { play(voiceChannel); }, timer);
      setTimeout(function () { }, timer);
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
