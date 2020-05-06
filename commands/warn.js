const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  async function play(channel) {
    await channel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/aniroze.mp3');
      await dispatcher.on('end', function () {
        channel.leave();
        setTimeout(function () {

        }, timer);

       await message.channel.send("🎧 **?נו אז איך היה הקטע של משה** 🎧").then(sentEmbed => {
          sentEmbed.react("👍")
          sentEmbed.react("👎")
      });
      });
  });
  }

  let timer = 10000;

  if (message.guild.channels.size == 0){
    message.channel.send('**תתחבר קודם לערוץ שיחה**');
    if (message.author.bot) return;
    
  }

  message.guild.channels.forEach(async (channel) => {
        if (channel.type == 'voice' && channel.members.size > 0) {
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .setDescription(`${message.author}` + '\n\n' + 'התחבר לערוץ שיחה תוך 10 שניות' + '\n\n' + 'ואני בדרך אליך עם אחד הקטעים החזקים של **משה השראוד**')
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setTimestamp()
      message.channel.send(embed2);
      setTimeout(function () {
        play(channel);
      }, timer);
      // timer = timer + 10000;
    }
    // else (channel.type == 'voice' && channel.members.size == 0)
    // return message.channel.send('**תתחבר קודם לערוץ שיחה**');

  });
  setTimeout(function () {

  }, timer);
};


exports.conf = {
  enabled: true,
  aliases: [''],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליי',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פליי'
}
