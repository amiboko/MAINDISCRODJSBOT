const Discord = require('discord.js');
const colors = require('../lib/colors.json');

exports.run = async (client, message, args, level) => { 


  async function play(channel) {
    await channel.join().then(async (connection) => {
      let dispatcher = await connection.playFile('./img/botsound.mp3');
      await dispatcher.on('end', function () {
        channel.leave();
      });
  });
  }

      let timer = 10000;
      const voiceChannel = message.member.voiceChannel

      if (!voiceChannel) return message.reply('you are not in a voice channel')
      voiceChannel.join()
      const embed2 = new Discord.RichEmbed()
      .setTitle('🎧 MASTERBOT-TUBE 🎧')
      .setColor("#3498DB")
      .setDescription(`${message.author}` + '\n\n' + 'אם אתה קורא לעצמך גבר' + '\n\n' + 'כנס זריז לשיחה יש לי משהו להגיד לך**')
      .setThumbnail(`${message.author.displayAvatarURL}`)
      .setTimestamp()
      message.channel.send(embed2);
      setTimeout(function () {
        play(channel);
      }, timer);
      // timer = timer + 10000;
   

  setTimeout(function () {
  }, timer);
};




































exports.conf = {
  enabled: true,
  aliases: [''],
  guildOnly: false,
  permLevel: ''
};

exports.help = {
  name: '',
  category: '',
  description: '',
  usage: ''
}
  
//   if (!args[0]) return message.channel.send('You need to specify a channel ID')
//   if (!client.channels.get(args[0])) return message.channel.send('Couldn\'t find a channel with that ID')
//   const channel = client.channels.find(ch => ch.id === args[0])
  
//   const embed = new Discord.RichEmbed()
//     .setColor(colors.default)
//     .addField(`Guild: `, channel.guild.name)
//     .addField(`Channel: `, channel.name)
//     .addField(`Guild Owner: `, channel.guild.owner)
//     .setTimestamp();
  
//   message.author.send(embed)
// };

