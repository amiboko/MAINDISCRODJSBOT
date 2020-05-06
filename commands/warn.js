const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  async function play(channel) {
    await channel.join().then(async (connection) => {
         let dispatcher = await connection.playFile('./img/aniroze.mp3');
      await dispatcher.on('end', function () {
        message.channel.send("🎧 ?איך היה 🎧");
        channel.leave();
      });
    });
  }

  let timer = 10000;
    message.guild.channels.forEach(async (channel) => {
    if (channel.type == 'voice' && channel.members.size > 0) {
      message.channel.send("🎧 כנס לשיחה אני תוך 10 שניות נכנס להשמיע לך קטע טוב 🎧");
      setTimeout(function () {
        play(channel);
      }, timer);
      // timer = timer + 10000;
    }
  });
  setTimeout(function () {
  }, timer);
};

exports.conf = {
  enabled: true,
  aliases: ['פליי'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליי',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פליי'
}
