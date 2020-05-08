const Discord = require('discord.js');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => { 

  const voiceChannel = message.member.voiceChannel

  async function play(voiceChannel) {
    await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/botsound.mp3', {volume: 0.9,});
      await dispatcher.on('end', function () {
        voiceChannel.leave();
      });
  });
  }

      let timer = 5000;
      if (!voiceChannel) return message.reply('**אם אתה קורא לעצמך גבר.. כנס לערוץ שיחה ותרשום את זה שוב**')
      await voiceChannel.join()
      const embed2 = new Discord.RichEmbed()
      .setTitle('לי ולך יש פיטפוט קטן, אני כמה שניות מחבר מיקרופון, שים פול ווליום')
      .setColor("#FF0000")
      .setThumbnail(`${message.author.displayAvatarURL}`)

      message.channel.send(embed2);
      setTimeout(function () {
        play(voiceChannel);
      }, timer);
      // timer = timer + 10000;
   

  setTimeout(function () {
  }, timer);
};


exports.conf = {
  enabled: true,
  aliases: ['שתוק'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'שתוק',
  category: 'כיף',
  description: 'מצטרף אליך לשיחה ומשמיע לך קצת כללים',
  usage: 'שתוק'
}
