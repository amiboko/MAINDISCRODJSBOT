const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  async function play(channel) {
    await channel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/aniroze.mp3');
      await dispatcher.on('end', function () {
        channel.leave();
      });
    });
  }

  let timer = 1000;
    message.guild.channels.forEach(async (channel) => {
    if (channel.type == 'voice' && channel.members.size > 0) {
      setTimeout(function () {
        play(channel);
      }, timer);
      timer = timer + 10000;
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
