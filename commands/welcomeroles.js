const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    const welcome = client.channels.find(c => c.name === 'general');
    welcome.fetchMessages({ limit: 0 }).then(collected => console.log('Fetched ' + collected.size + ' messages.')).catch(console.error);
    const a = message.guild.roles.get('671631357725638656'); // PLAYING


    const embed = new Discord.RichEmbed()
        .setTitle('PLAYING ROLE')
        .setDescription(`
       
         יקירים, רול זה נועד לעשות קצת סדר בכל חדרי המשחק בערוץ
         קבלת הרול כידוע תעשה אוט' בעזרת האפשרות **Game Activity** שבהגדרות שלכם
         
         בנוסף תתאפשר ידני לכאלה שלא הפעילו את האופציה בהגדרות או שחקני קונסולה
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
    aliases: ['רול'],
    guildOnly: true,
    permLevel: 'Administrator'
  }
