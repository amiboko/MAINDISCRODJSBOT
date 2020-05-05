const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.playFile('./img/aniroze.mp3');
        dispatcher.on("end", end => {message.member.voiceChannel.leave()});
    })
    .catch(console.error);
  }
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
