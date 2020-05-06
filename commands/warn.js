const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  async function play(channel) {
    await channel.join().then(async (connection) => {
         let dispatcher = await connection.playFile('./img/aniroze.mp3');
         dispatcher.setVolume(1.0);
      await dispatcher.on('end', function () {
        channel.leave();
      });
        message.channel.send("🎧 **?נו אז איך היה הקטע של משה** 🎧").then(sentEmbed => {
          sentEmbed.react("👍")
          sentEmbed.react("👎")
      });
    });
  }

  let timer = 10000;
    message.guild.channels.forEach(async (channel) => {
    if (channel.type == 'voice' && channel.members.size > 0) 
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .setDescription(`${message.author}` + '\n\n' + 'התחבר לערוץ שיחה תוך 10 שניות' + '\n\n' + 'ואני בדרך אליך עם אחד הקטעים החזקים של **משה השראוד**')
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setTimestamp()
      message.channel.send(embed2);
      if (channel.type == 'voice' && channel.members.size == 0) 
      return message.channel.send('**תתחבר קודם לערוץ שיחה**');
      setTimeout(function () {play(channel);
      }, timer);
      // timer = timer + 10000;
    }
  )

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
