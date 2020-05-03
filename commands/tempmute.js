const Discord = require('discord.js')


exports.run = async (client, message, args, level) => {

    let quote = [  
                 "היי",
                 "מה קורה יזיין",
                 "וואלק וואלק",
                 "Привет там",
                 "HEY",
                 "מצוץ לי",
                 "שלום שלום",
                 "אני תאנוס",
                 "אני מוריס",
                 "שתוק",
                 "`ימים ושעות שרפתי בשביל הבוט המזדיין הזה ועוד הפכתי אותו לסי שארפ ובזה אתה משחק 🤦‍♂️`",
                 "שלום גם לך",
                 "קח אותי לקיר",
                 "אני בלי טיטול",
                 "קצת פורנו לא יזיק לך",
                 "טוב תגיד לי מה הסיפור שלך? מה אתה ספאמר? מה נסגר איתך? אתה מטומטם? ההורים שלך אחים?",
                 "**טוב דיי**",
                 "**שלום**",
                 "**מה**",
                 "**YO!!!**", 
                ];
    let quoteXD = quote[Math.floor(Math.random() * quote.length)];
    // message.delete().catch() //clear היי 
    
    return message.channel.send(quoteXD);
    then(message => message.delete(300000)).catch(console.error);  // clear reply 9sec
}





exports.conf = {
  enabled: true,
  aliases: ['שלום','היי','hey','hi','הי','וואלק','HEY','HI','ה','הלו'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'שלום',
  category: 'כיף',
  description: 'בוא תגיד שלום',
  usage: 'היי'
}
