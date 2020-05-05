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
    client.ShowSuccess('בודק בדיקה');
    message.guild.channels.forEach(async (channel) => {
      if (channel.type == 'voice' && channel.members.size > 0) {
        client.ShowSuccess('בדיקה 33 ' + channel.name + ' בדיקה 22 ' + channel.members.size + ' בדיקה 11', message.channel);
        client.logger.log('בדיקה1 ' + channel.name + ' בדיקה 2 ' + channel.members.size + ' בדיקה 3');
        setTimeout(function () {
          play(channel);
        }, timer);
        timer = timer + 10000;
      }
    });
    setTimeout(function () {
      client.ShowSuccess('בדיקה');
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
