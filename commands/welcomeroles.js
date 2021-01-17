const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    const welcome = client.channels.find(c => c.name === '𝙄𝙉𝙁𝙊');
    welcome.fetchMessages({ limit: 0 }).then(collected => console.log('Fetched ' + collected.size + ' messages.')).catch(console.error);
    const a = message.guild.roles.get('771450742070444042'); 

    const embed = new Discord.RichEmbed()
    .setTitle('PLAYING ROLE')
    .addField(`קליק על 🕹️ ותקבלו גישה ל𝐆𝐚𝐦𝐞 𝐕𝐨𝐢𝐜𝐞 𝐂𝐡𝐚𝐧𝐧𝐞𝐥𝐬`,'➖➖➖➖➖➖➖➖➖➖')
    .setDescription(`${a.toString()}`)
    .setThumbnail(client.user.avatarURL)

        if (!welcome) return

    message.channel.send(embed).then(async msg => {
        await msg.react('🕹️');
    });

};

exports.conf = {
    enabled: true,
    aliases: ['role'],
    guildOnly: true,
    permLevel: 'Administrator'
  }

  exports.help = {
    name: 'רול',
    category: 'Administrator',
    description: 'מייצר רולים',
    usage: 'playingrole'
  }