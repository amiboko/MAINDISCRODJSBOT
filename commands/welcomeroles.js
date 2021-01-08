const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    const welcome = client.channels.find(c => c.name === '📋');
    welcome.fetchMessages({ limit: 0 }).then(collected => console.log('Fetched ' + collected.size + ' messages.')).catch(console.error);
    const a = message.guild.roles.get('771450742070444042'); // PLAYING


    const embed = new Discord.RichEmbed()
        .setTitle('PLAYING ROLE')
        .setDescription(`
       
         רול זה נועד לעשות קצת סדר בכל חדרי המשחק בערוץ
         קבלת הרול כידוע תעשה אוט' בעזרת האפשרות **Game Activity**
         
         בנוסף תתאפשר ידני לכאלה שהאפשרות לא פעילה או לשחקני קונסולה
                  כל מה שנשאר לעשות זה פשוט ללחוץ על-🎮 לקבלת הרול 

        ${a.toString()}
       `)
        .setColor(0xdd9323)
        .setThumbnail(client.user.avatarURL)
        if (!welcome) return

    message.channel.send(embed).then(async msg => {

        await msg.react('🎮');
        // await msg.react('🇧');
        // await msg.react('🇨');
    });
};

exports.conf = {
    enabled: true,
    aliases: ['sendrole'],
    guildOnly: true,
    permLevel: 'Administrator'
  }

  exports.help = {
    name: 'רול',
    category: 'Administrator',
    description: 'מייצר רולים',
    usage: 'playingrole'
  }