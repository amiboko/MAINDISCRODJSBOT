const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  const voiceChannel = message.member.voiceChannel
  message.delete();
  
  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/aniroze.mp3', {volume: 0.9,});
      await dispatcher.on('end', function () { 

          setTimeout(function () { voiceChannel.leave();}, 5000);

          for (let member of voiceChannel.members) {member[1].setMute(false)}
      });

      });

  }
  
       let timer = 10000;
       if (!voiceChannel) return message.reply('**אתה לא בערוץ שיחה איך אתה רוצה לשמוע בידיוק?**')
       for (let member of voiceChannel.members) {member[1].setMute(true)}
       for (let member of voiceChannel.members) {member[1].setDeaf(false)}

       voiceChannel.join()
       
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .addField('הערוץ 🔇 זמנית לניגון הקטע', 'האזנה נעימה')
      .setDescription(`${message.author}` +'\xa0' + 'ברוך הבא לנגן שלי' + '\n\n' + '`🔊 10 שניות לניגון הלהיט של משה השראוד 🔊`' + '\n\n')
      .setTimestamp()
      
      message.channel.send(embed2).then(message => message.delete(500000)).catch(console.error);
     
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
