'use strict'

if (Number(process.version.slice(1).split('.')[0]) < 10) throw new Error('NodeJS 10.0.0 or higher is required. Re-run this with NodeJS 10.0.0+')
if (process.env.PREBOOT) eval(process.env.PREBOOT)
require('dotenv').config()

const Discord = require('discord.js')
const Enmap = require('enmap')

const client = new Discord.Client({
  
  disableEveryone: false,
  disabledEvents: ['TYPING_START']
})
const serverStats = {
  guildID: '583574396686434304',
  totalUsersID: '673661197782089758',
  memberCountID: '673661265180360847',
  botCount: '673661316082302993'
  }
const dblposer = require('dblposter')
const DBLPoster = new dblposer(process.env.DBL_TOKEN, client)

DBLPoster.bind()

client.starttime = new Date().getTime()
client.points = new Enmap({ name: 'points' })
client.pingwords = new Enmap({ name: 'pingwords' })
client.inventory = new Enmap({ name: 'inventory' })
client.garden = new Enmap({ name: 'garden' })
client.money = new Enmap({ name: 'money' })
client.cooldown = new Enmap({ name: 'cooldown' })
client.badges = new Enmap({ name: 'badges' })
client.logins = new Enmap({ name: 'logins' })
client.reputation = new Enmap({ name: 'reputation' })
client.settings = new Enmap({ name: 'settings' })
client.fish = new Enmap({ name: 'fish' })
client.flags = new Enmap({ name: 'flags' })
client.treasure = new Enmap({ name: 'treasure' })
client.life = new Enmap({ name: 'life' })
client.tags = new Enmap({ name: 'tags' })
client.uses = new Enmap({ name: 'commandpop' })
client.minecooldown = new Discord.Collection()
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.liusers = new Discord.Collection()
client.music = {}
client.levelCache = {}

process.env.SESSION_SECRET = ''
for (let i = 0; i <= 1500; i++) {
  process.env.SESSION_SECRET += Math.random()
    .toString(16)
    .slice(2, 8)
    .toUpperCase()
    .slice(-6) + i
}

client.config = require('./config.js')
require('./modules/_functions')(client)
require('./modules/commands')(client)
require('./modules/events')(client)
// require('./modules/webhooks')(client)


const AntiSpam = require('discord-anti-spam');

const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	kickThreshold: 10, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 12, // Amount of messages sent in a row that will cause a ban.
	muteThreshold: 5, // Amount of messages sent in a row that will cause a mute.
	maxInterval: 1000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, עקב ספאם הוספתי אותך לרשימה השחורה, במידה ותמשיך להספים תעוף אוטומטית,', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** קיבל קיק בעקבות ספאם', // Message that will be sent in chat upon kicking a user.
	banMessage: '**{user_tag}** קיבל באן בעקבות ספאם', // Message that will be sent in chat upon banning a user.
	muteMessage: '**{user_tag}** הושתק בעקבות ספאם', // Message that will be sent in chat upon muting a user.
	maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 9, // Amount of duplicate messages that trigger a warning.
	exemptPermissions: [ 'ADMINISTRATOR'], 
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredUsers: [], // Array of User IDs that get ignored.
	removeMessages: true, // Array of User IDs that get ignored.
});

client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));
antiSpam.on("spamThresholdWarn", (member) => console.log(`${member.user.tag} has reached the warn threshold.`));
antiSpam.on("warnAdd", (member) => console.log(`${member.user.tag} has been warned.`));
client.on('message', (msg) => {
	antiSpam.message(msg);
});

client.on('ready', () => {
  const moment = require('moment');
  const CronJob = require('cron').CronJob;
  const channel = client.channels.find(chan => chan.name === '𝓜𝓪𝓲𝓷');

  var job = new CronJob({
      // cronTime: '00 03 00 * * 1-7', // 00:03:00
      cronTime: '00 59 23 * * *', //* * * * * every minute
      onTick: function() {
        const embed = new Discord.RichEmbed()
        .setColor('#F0F0F0')
        .setTitle('לילה טוב גיימרים יקרים')
        .setImage('https://img.ifunny.co/images/2d510a8e25ef74cb1687319e3a488fc6c07cd7b4af62c83a3506dec9a67d695e_1.gif')
        .setFooter('הודעה אוטומטית')
        .setTimestamp()
        channel.send('@everyone', embed);
        console.log(moment.tz('Israel').format('HH:mm:ss'))
      },
      start: false,
      timeZone: 'Israel'
 });
  job.start();
});

client.on('ready', () => {
  const moment = require('moment');
  const CronJob = require('cron').CronJob;
  const channel = client.channels.find(chan => chan.name === '𝓜𝓪𝓲𝓷');

  var job = new CronJob({
      cronTime: '00 00 08 * * *', //* * * * * every minute
      onTick: function() {
        const embed = new Discord.RichEmbed()
        .setColor('#FFFF00')
        .setTitle('בוקר טוב גיימרים יקרים\nשיהיה לכם אחלה יום')
        .setFooter('הודעה אוטומטית')
        .setImage('https://res.cloudinary.com/teepublic/image/private/s--xYRu_bko--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1564835655/production/designs/5499185_0.jpg')
        .setTimestamp()
        channel.send('@everyone', embed);
        console.log(moment.tz('Israel').format('HH:mm:ss'))
      },
      start: false,
      timeZone: 'Israel'
 });
  job.start();
});



 client.on('message', async message => {

  let blacklisted = ['זיין', 'גאבנו', 'סוכה', 'מוצץ', 'זונה', 'שרמוטה', 'קוקסינל', 'תחת', 'חרא', 'בולבול', 'מכוער'
  , 'דפוק', 'אידיוט', 'חמור', 'מנייאק', 'מניאק', 'FUCK', 'fuck', 'מגעיל', 'טיפש',
   'pussy', 'PUSSY', 'ass', 'ASS', 'כוסרבאק', 'כוס', 'כוסאומו','כוסראבק', 'מנוול' , 'מנוולת' , 'זין'] 

  let foundInText = false;
  for (var i in blacklisted) { 
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
    if (foundInText) {
      if (message.author.bot) return;
      //message.delete();

      let answerlist = [
      '`סליחה! רק לי מותר לקלל פה יזיין`'
            , '`אתה מקלל הרבה לאחרונה... הכל בסדר בבית?`' 
            ,'**מה יהיה עם הקללות**'
            ,'**⚠️ תרגיע עם הקללות שלך ⚠️**'
            ,'**חבל!**'
            ,'**חלאס לקלל יבור של חרא**'
          ]
      
      let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];

      message.channel.send(message.author +'\xa0\xa0'+ ansxd);
  }
});

client.on('message', async message => {
  let orenuseless = 
  [

      "מי זורם למשחק ללא חילועים",
      "משהוא מעונין ברכיבה על סוס אולי?",
      "איך הסוס שלי?",
      "RED DEAD משהוא?",
      "מי עייף מקוד וזורם על קצת רכיבת סוסים",
      "איזה נוף אחי!",

  ];

  let factnum = Math.floor((Math.random() * orenuseless.length));

  let factembed = new Discord.RichEmbed()
  .setColor("#790000")
  .setTitle(orenuseless[factnum])
  .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/oren.gif')


  if(message.content.includes('סוס'))
  
   {
      message.channel.send(factembed);
   }

   if(message.content === 'Red')
  
   {
      message.channel.send(factembed);
   }

   if(message.content === 'dead')
  
   {
      message.channel.send(factembed);
   }

   if(message.content === 'אהרון')
  
   {
      message.channel.send(factembed);
   }
  if(message.content === 'אורן')
  
   {
      message.channel.send(factembed);
   }

  if(message.content === 'oren')
  
   {
      message.channel.send(factembed);
   }

   if(message.content.includes('Blackprop'))
 
   {
      message.channel.send(factembed);
   }
   
   if(message.content.includes('RED'))
  
   {
      message.channel.send(factembed);
   }

   if(message.content.includes('red'))
  
   {
      message.channel.send(factembed);
   }

   if(message.content.includes('DEAD'))
  
   {
      message.channel.send(factembed);
   }

   if (message.author.bot) return;
});


client.on('message', async message => {
  let orenuseless = 
  [

      "מי בא לחלע?!",
      "יש משחק?!",
      "אני חם!",
      "בוא נפרק!",
      "WARZONE?",
      "BR כן?!",

  ];

  let factnum = Math.floor((Math.random() * orenuseless.length));

  let factembed = new Discord.RichEmbed()
  .setColor("#000000")
  .setTitle(orenuseless[factnum])
  .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/RONICOD.gif')

  if(message.content === 'קוד')
  
   {
      message.channel.send(factembed);
   }

   if(message.content.includes('cod'))
 
   {
      message.channel.send(factembed);
   }
   
   if(message.content.includes('COD'))
  
   {
      message.channel.send(factembed);
   }

   if (message.author.bot) return;
});


  client.on('guildMemberAdd', member => {
    if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Members Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCount).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);
  });
 
  client.on('guildMemberRemove', member => {
    if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Members Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCount).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`)
    });


client.on('presenceUpdate', (oldMember, newMember) => {
  const guild = newMember.guild;
  const playingRole = guild.roles.find(role => role.id === '671635962228637696');

// newMember.presence.clientStatus === 'mobile'

  if (newMember.user.bot || oldMember.presence.status !== newMember.presence.status) return;

  const oldGame = oldMember.presence.game && [0, 1].includes(oldMember.presence.game.type) ? true : false;
  const newGame = newMember.presence.game && [0, 1].includes(newMember.presence.game.type) ? true : false;

  const embed1 = new Discord.RichEmbed()
  .setTitle('New Status')
  .setColor("#3498DB")
  .setDescription(`${newMember.user}`  + '\n\n' + `${playingRole}` + '\n' + `${newMember.presence.game}` +  '\xa0\xa0'  +'<a:itsmine:691725601966391387>')
  .setThumbnail(`${oldMember.user.displayAvatarURL}`)
  .setTimestamp()

  const embed2 = new Discord.RichEmbed()
  .setTitle('New Status')
  .setColor("#3498DB")
  .setDescription(`${newMember.user}` + '\n\n' + 'Stopped' +  `${playingRole}` + '\xa0\xa0' + '<a:veri:693846904374689803>')
  .setThumbnail(`${oldMember.user.displayAvatarURL}`)
  .setTimestamp()

  if (!oldGame && newGame) {         
    newMember.addRole(playingRole)

    // .then(() => client.channels.get(`689067371843158026`)
    // .send(embed1))

  } else if (oldGame && !newGame) {  
    newMember.removeRole(playingRole)

    // .then(() => client.channels.get(`689067371843158026`)
    // .send(embed2))
  }
});

client.on("presenceUpdate", (oldMember, newMember) => {
  if(newMember.id === '539020416178454540') {
      if(newMember.presence.game === 'ROBLOX') {  
          console.log('ROBLOX detected!');
          client.channels.get('583575179880431616').send(newMember.user + '\xa0\xa0\xa0' + '**\n ?אתה אמיתי שאתה משחק בחרא הזה \n**', {
              files: [
                  "https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/ROBLOX.jpg"
                  ]
              });
          }
      }
  });


client.on('message', message => {
  if(message.content.includes(`${client.user.id}`)) {
    const embed2 = new Discord.RichEmbed()
    .setTitle('שלום גם לך')
    .setDescription(message.author + `
    מכיוון שתייגת אותי, יש לי שאלה קטנה

        **מה אתה מרגיש כלפיי?**
        `)
        .addField(`רשום 2 אם אתה`   , 'אוהב אותי', true)
        .addField(`רשום 1 אם אתה`   , 'שונא אותי', true)
    .setTimestamp()
    .setFooter('תגיב ב 1 או 2')
    .setColor('#0094FB')
    if (message.author.bot) return;

      message.channel.send(embed2).then(message => message.delete(60000).catch());

      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {maxMatches: 1 , time: 60000 });

      collector.on('collect', message  => {
      
				const embed = new Discord.RichEmbed()
          .setColor('#EE82EE')
          .setTitle(' 😍 גם אני אוהב אותך 😍 ')
          .setImage('https://www.beithillel.org.il/wp-content/uploads/2018/07/189-8820141611.jpg')
          .setDescription(`${message.author}`)
          
          const embed1 = new Discord.RichEmbed()
          .setColor('#800000')
          .setTitle(' 🤬 גם אני שונא אותך אמן תמות 🤬 ')
          .setImage('https://i1.pngguru.com/preview/376/476/885/rad-s-64-i-hate-you-text-png-clipart.jpg')
          .setDescription(`${message.author}`)

          if (message.content === '2') {
          message.channel.send(embed)
          message.delete(message.author), 1000;
        } 
          else if (message.content === '1'){
          message.channel.send(embed1)
          message.delete(message.author), 1000;
        }
          
});
     
        collector.on('end', collected => {

          const embed3 = new Discord.RichEmbed()
          .setColor('#54FF9F')
          .setTitle('לא ענית לשאלה שלי ...')
          .setImage('https://www.reactiongifs.com/wp-content/uploads/2012/11/crying-man.gif')
          .setDescription(`${message.author}`)

          if (collected.size === 0) {
            message.channel.send(embed3).then(message => message.delete(60000).catch());
          } 
        });
      }
  });

client.on('message', message => {
  
  if(message.content.includes('SHROUD'))
   {
      message.channel.send('https://en.wikipedia.org/wiki/Shroud_(gamer)');
   }
   if(message.content.includes('shroud'))
   {
      message.channel.send('https://en.wikipedia.org/wiki/Shroud_(gamer)');
   }
   if(message.content == 'שראוד')
   {
      message.channel.send('https://en.wikipedia.org/wiki/Shroud_(gamer)');
   }

  if (message.author.bot) return;
  
});

client.on('message', message => {
  
  if(message.content.includes('רוני')) {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle('`רוווווווווני`')
    .setColor("#000000")

      message.channel.send(embed);
      
  }
});

client.on('message', message => {
  
  if(message.content === 'מת') {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle(':skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: ')
    .setColor("#000000")
    .setImage('https://media.tenor.com/images/d3b2659d7a550f43db3d6546924e6d71/tenor.gif')

      message.channel.send(embed);
      
  }
});



client.on('message', message => {
  
  if(message.content.includes('ילד')) {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle('`למי קראת ילד ?!`')
    .setColor("#000000")

      message.channel.send(embed);
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('קלל')) {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle('`🔞`')
    .setColor("#000000")

      message.channel.send(embed);
      
  }
});


client.on('message', message => {
  
  if(message.content.includes('חלע')) {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle('`💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣💣`')
    .setColor("#D61F1F")
    .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/rambo.gif')

      message.channel.send(embed);
      
  }
});


client.on('message', message => {
  
  if(message.content.includes('חזק')) {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle('חזק ובניו 💪')
    .setColor("#F0F0F0")

      message.channel.send(embed);
  }
});


client.on('message', message => {
  
  if(message.content.includes('תודה')) {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle('בכיף נשמה יקרה')
    .setColor("#FFC0CB")
    .setDescription(`${message.author}`)

      message.channel.send(embed);
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('מלשין')) {
    if (message.author.bot) return;
    const embed = new Discord.RichEmbed()
    .setTitle('<a:veri:691980334782218240>')
    .setColor("#0000FF")

      message.channel.send(embed);
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('@everyone')) {
    if (message.author.bot) return;
      message.channel.send("@everyone" +'\xa0\xa0\xa0\xa0'+ '<a:veri:691980333968785448>');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('חכם')) {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '<a:veri:691980335235334155>');
      
  }
});


client.on('message', message => {
  
  if(message.content.includes('Ami')) {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ 'לא תשא את שמו של יוצרי לשווא');
      
  }
});



client.on('message', message => {
  
  if(message.content.includes('זורם')) {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`אני זורם`');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('אמין')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`אני מאמין לך`');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('מבין')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`אני מבין אותך`');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('שחור')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`זה הצבע שאתה אוהב?`');
      
  }
});




client.on('message', message => {
  
  if(message.content.includes('בוט')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`קראת לי?`');
      
  }
});


client.on('message', message => {
  
  if(message.content.includes('מייי')) {
    if (message.author.bot) return;
      message.channel.send('`🐱 מיאאאההווו חתולההההה 🐱`');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('3..')) {
    if (message.author.bot) return;
      message.channel.send('`2️...1...`');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('לשחק')) {
    if (message.author.bot) return;

    const embed = new Discord.RichEmbed()
    .setColor("#0000FF")
    .setImage('https://media.giphy.com/media/d8i1XJjV2Ym53KK0Dn/giphy.gif')

      message.channel.send(embed);
      
  }
});

client.on('message', message => {
  if(message.content.includes('ואללק')) {
    if (message.author.bot) return;
      message.channel.send('ואללק' +'\xa0\xa0'+  message.author +'\xa0\xa0'+ 'אתה רוצה שהמנוולת תרקוד ותסגוד או שתשתוק?');
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {max: 1 , time: 20000 });
      collector.on('collect', message => {
        if (message.content.includes('תרקוד')) {
          message.channel.send(message.author + '`היא כבר רוקדת וסוגדת לך יסוטה`');
        } else if (message.content.includes('שתוק'))
        return message.channel.send(message.author +'\xa0\xa0'+ '`שתווווווווווווק יזין`');
        });
      }
  });


client.on('message', message => {
  if(message.content === 'כלב') {
    if (message.author.bot) return;
      message.channel.send(message.author + 'אתה בן אדם רע או שאתה ילד קטן, בן כמה אתה?');
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {max: 1 , time: 20000 });
      collector.on('collect', message => {
        if (message.content == "25" || message.content == "26" || message.content == "27" || message.content == "28"|| message.content == "29"|| message.content == "24"|| message.content == "23") {
          message.channel.send(message.author + '`הגיע הזמן שתשכב עם בחורה אחי והכל יסתדר`');
        } else return message.channel.send(message.author + '`כנראה שאתה פשוט בן אדם רע`');
        });
      }
  });

client.on('message', message => {
  if(message.content === 'כן') {
    if (message.author.bot) return;
      message.channel.send(message.author + '` כמה זה 1 + 1 ?`');
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, {max: 1, time: 20000 });
      collector.on('collect', message => {
        if (message.content == "2") {
          message.channel.send(message.author + '**למדת משהו בחיים המסכנים שלך**');
        } else return message.channel.send('`⛔שמעעע אתה טמבל⛔`');
      });
     }
});

client.on('message', message => {
  if(message.content == 'לא') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`אתה בטוח?`');
  }
});


client.on('message', message => {
  if(message.content == 'שירי') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`תרשום שירים תקבל שירים,`');
  }
});


client.on('message', message => {
  if(message.content == 'מתן') {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ 'אם התכוונת לשמוע את השיר של מתן אז תרשום פליימתן');
  }
});

client.on('message', message => {
  if(message.content.includes('אחי')) {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+  '`כולנו אחים`');
  }
});


client.on('message', message => {
  if(message.content.includes('כנס')) {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`תזמין קודם`');
  }
});

client.on('message', message => {
  if(message.content.includes('סבבה')) {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`סבמבה`');
  }
});

client.on('message', message => {
  if(message.content === '?') {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`תרשום פקודה תקבל פקודות`');
  }
});

client.on('message', message => {
  if(message.content === '??') {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`מה הסיפור שלך?`');
  }
});

client.on('message', message => {
  if(message.content === '???') {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`יש מצב שאתה גיי?`');
  }
});

client.on('message', message => {
  if(message.content === '????') {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`טוב מה נסגר איתך?`');
  }
});

client.on('message', message => {
  if(message.content === '?????') {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ '`מה אתה רוצה?`');
  }
});

for (let i = 0; i < client.config.permLevels.length; i++) {
  const currentlevel = client.config.permLevels[i]
  client.levelCache[currentlevel.name] = currentlevel.level
}

client.login(process.env.token)

module.exports = client
