const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  async function play(channel) {
    await channel.join().then(async (connection) => {
         let dispatcher = await connection.playFile('./img/aniroze.mp3');
      await dispatcher.on('end', function () {
        message.channel.send("🎧 נו אז איך היה? 🎧");
        channel.leave();
      });
    });
  }

  let timer = 10000;
    message.guild.channels.forEach(async (channel) => {
    if (channel.type == 'voice' && channel.members.size > 0) {
      if (!channel.join()) {
        const embed1 = new RichEmbed()
          .setTitle('🚫 ').setColor('#031900')
          .setDescription('**תתחבר קודם לשיחה**');
        return message.channel.send({embed1});
      }

      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .setDescription(`${message.author}` + '\n\n' + 'התחבר לערוץ שיחה תוך 10 שניות' + '\n\n' + 'ואני בדרך אליך עם אחד השירים הקטעים החזקים של משה השראוד')
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setTimestamp()
      message.channel.send(embed2);

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
  aliases: ['פליי','אני רוצה'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'פליי',
  category: 'כיף',
  description: 'משמיע שיר בערוץ',
  usage: 'פליי'
}
