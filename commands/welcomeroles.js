const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    const welcome = client.channels.find(c => c.name === '📋');
    welcome.fetchMessages({ limit: 0 }).then(collected => console.log('Fetched ' + collected.size + ' messages.')).catch(console.error);
    const a = message.guild.roles.get('771450742070444042'); // PLAYING

    const embed = new Discord.RichEmbed()
        .setTitle('GAMERS UNITED RULES')
        .addField(`תקללו חופשי רק קחו בחשבון שלי מותר הכל`,'➖➖➖➖➖➖➖➖➖➖')
        .addField(`יש לי פתיל קצר אז בלי חפירות בבקשה`,'➖➖➖➖➖➖➖➖➖➖')
        .addField(`גזענות לא מתקבלת על הדעת (לא תופס על תיימנים)`,'➖➖➖➖➖➖➖➖➖➖')
        .addField(`צריכים עזרה? רשמו עזרה או פקודות ותקבלו באהבה`,'➖➖➖➖➖➖➖➖➖➖')
        .setDescription(`ברוכים הבאים לערוץ שלנו \n כמה כללים חשובים\n`)

        .setThumbnail(client.user.avatarURL)
    
        const embed2 = new Discord.RichEmbed()
        .setTitle('PLAYING ROLE')
        .addField(`קליק על 🕹️ ותקבלו גישה ל𝐆𝐚𝐦𝐞 𝐕𝐨𝐢𝐜𝐞 𝐂𝐡𝐚𝐧𝐧𝐞𝐥𝐬`,'➖➖➖➖➖➖➖➖➖➖')
        .setDescription(`${a.toString()}`)
        .setThumbnail(client.user.avatarURL)

    let pages = [embed, embed2];
    let page = 1; 
    
        message.channel.send(embed).then(async msg => {
            
        msg.react('⬅').then( r => {
            msg.react('➡')
    
            // Filters
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
    
            const backwards = msg.createReactionCollector(backwardsFilter, {timer: 0});
            const forwards = msg.createReactionCollector(forwardsFilter, {timer: 0});
    
            backwards.on('collect', r => {
                if (page === 1) return;
                page--;
                // embed.setDescription(pages[page-1]);
                embed.setFooter(`עמוד ${page} מתוך ${pages.length}`);
                msg.edit(embed)
                r.remove(r.users.filter(u => u === message.author).first());
            })
    
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                // embed.setDescription(pages[page-1]);
                embed.setFooter(`עמוד ${page} מתוך ${pages.length}`);
                msg.edit(embed2)
                msg.react('🕹️')
                r.remove(r.users.filter(u => u === message.author).first());
            })
        })
    })


    if (!welcome) return

};

exports.conf = {
    enabled: true,
    aliases: ['botmenu'],
    guildOnly: true,
    permLevel: 'Administrator'
  }

  exports.help = {
    name: 'botmenu',
    category: 'Administrator',
    description: 'botmenu',
    usage: 'bot menu'
  }