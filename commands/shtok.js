const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message) => {

  const voiceChannel = message.member.voiceChannel

  message.delete(30000);

  if (!voiceChannel) return message.reply('**אם אתה גבר כנס לערוץ שיחה ותרשום שוב את מה שרשמת . . .**').then(message => message.delete(120000));

  voiceChannel.join().then(async (connection) => {
   let dispatcher = connection.playFile('./img/botsound.mp3', {volume: 1.0});
     await dispatcher.on("end", end => {voiceChannel.leave();
        for (let member of voiceChannel.members) {member[1].setMute(false)}
    });
  })
   .catch(console.error);
   for (let member of voiceChannel.members) {member[1].setMute(true)}
};

exports.conf = {
  enabled: true,
  aliases: ['טמבל','סתום','מפגר','דביל','מסריח','דבע','זבל','שתוק','חרא','שמוק'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'קללות',
  category: 'כיף',
  description: 'כנס לשיחה ותקלל אם אתה גבר',
  usage: 'שתוק'
}
