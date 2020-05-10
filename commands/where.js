const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message) => {

  const voiceChannel = message.member.voiceChannel

  message.delete(35000);

  async function play(voiceChannel) {
        await voiceChannel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/botsound.mp3', {volume: 1.0});
      await dispatcher.on('end', function () { 
          setTimeout(function () { voiceChannel.leave();}, 3000);
          for (let member of voiceChannel.members) {member[1].setMute(false)}
      });
      });
  }
  
       if (!voiceChannel) return message.reply('**ככה אתה מקלל, אתה יודע מה, אם אתה כזה גבר כנס לשיחה ותכתוב את זה שוב**')
       voiceChannel.join();
              
      const embed2 = new Discord.RichEmbed()
      .setAuthor('⛔⛔⛔⛔⛔⛔⛔⛔⛔')
      .setTitle('יש לנו שיחת נהלים קצרה...')
      .setColor("#FF0000")
      .setFooter(`${message.author.tag}`, message.author.avatarURL)
      .setTimestamp()
      message.channel.send(embed2).then(message => message.delete(35000));

      setTimeout(function () {play(voiceChannel);}, 3000);
      for (let member of voiceChannel.members) {
       member[1].setMute(true)    }

};

exports.conf = {
  enabled: true,
  aliases: ['שתוק','טמבל','סתום','מפגר'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליי',
  category: 'כיף',
  description: 'כנס לשיחה ותרשום  אם אתה גבר',
  usage: 'שתוק'
}
