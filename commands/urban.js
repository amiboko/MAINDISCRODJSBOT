const Discord = require('discord.js')


exports.run = async (client, message, args, level) => {

    let quote = [  
                 "אתה גיי",
                 "לךךךךך ימזדיין בתחת",
                 "תשמע אתה גיי אחושרמוטה",
                 "הומו מוצץ זיין",
                 "לא אתה!",
                 "אז איך זה לקבל בתחת?",
                 "תגיד יש מצב שאתה בכלל מאומץ לזוג גייז",
                 "מה קורה עברי לידר",
                 "גייגייגייגייגייגייגייגייגייגייגייגיי",
                 "🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈",
                 "`זה הדגל 🏳️‍🌈 לאום שלך יהומו`",
                 "👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬👬",
                 "⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣⚣",
                 "זה בסדר להיות גיי",
                 "תשאל את shluki#6927@ איך זה להיות גיי",
                 "**גם להומויים יש זכויות**",
                 "**GAY**",
                 "**GAAAAAAAAAAAAAAAAYEEEEEEEEEEEE**",
                 "**מה קורה מתוווווקההההההההה**", 
                ];
    let quoteXD = quote[Math.floor(Math.random() * quote.length)];
    // message.delete().catch() //clear היי 
    
    return message.channel.send(message.author +'\xa0\xa0'+ quoteXD).then(message => message.delete(21600000)).catch(console.error);  // clear reply 
}

exports.conf = {
  enabled: true,
  aliases: ['גיי','gey','GAY','gay','homo','הומו','מוצץ','זונה','שרמוטה','גי','ג','XD'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'GAY',
  category: 'Fun',
  description: 'GAY',
  usage: 'GAY'
}
