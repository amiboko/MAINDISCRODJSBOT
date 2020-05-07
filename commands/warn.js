const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  async function play(channel) {
    await channel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/matan.mp3');
      await dispatcher.on('end', function () {
        message.channel.send("🎧 **?נו אז איך היה הקטע של מתן האשדודי** 🎧").then(sentEmbed => {
          sentEmbed.react("👍")
          sentEmbed.react("👎")
        
        channel.leave();});
      });
  });
  }

  let timer = 10000;
       message.guild.channels.forEach(async (channel) => {
       if (channel.type == 'voice' && channel.members.size > 0) {
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .setDescription(`${message.author}` + '\n\n' + 'תתחבר לערוץ שיחה תוך 10 שניות' + '\n\n' + 'ואני בדרך אליך עם אחד הקטעים החזקים של **מתן האשדודי**')
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setTimestamp()
      message.channel.send(embed2);
      setTimeout(function () {
        play(channel);
      }, timer);
      // timer = timer + 10000;
    }});

  setTimeout(function () {
  }, timer);
};

exports.conf = {
  enabled: true,
  aliases: ['פליימתן'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליי',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פליי'
}
