const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {

  async function play(channel) {
    await channel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/aniroze.mp3');
      await dispatcher.on('end', function () {
        message.channel.send("🎧 **?נו אז איך היה הקטע של משה** 🎧").then(sentEmbed => {
          sentEmbed.react("👍")
          sentEmbed.react("👎")
        
        channel.leave();});
      });
  });
  }

  let timer = 10000;
  client.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (message.content === 'test') {
      // Only try to join the sender's voice channel if they are in one themselves
      if (message.guild.channels) {
      } else {
        message.reply('You need to join a voice channel first!');
    
  // message.guild.channels.forEach(async (channel) => {
  // if (channel.type == 'voice' && channel.members.size > 0) {
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
  }
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
