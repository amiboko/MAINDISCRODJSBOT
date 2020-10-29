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


client.on("presenceUpdate", (oldGuildMember, newGuildMember) => {
  if (newGuildMember.guild.id !== "GuildID") {return false};
  const Role = newGuildMember.guild.roles.get("771450742070444042");
  if (!Role) {return console.error("No role found.")};

  if (newGuildMember.presence.status == "offline") {
      newGuildMember.removeRole(Role).catch(e => {console.error(e)});
  } 
});


client.on('presenceUpdate', (oldMember, newMember) => {
  const guild = newMember.guild;
  const playingRole = guild.roles.find(role => role.id === '771450742070444042');

  if (newMember.user.bot || newMember.presence.clientStatus === 'mobile' || oldMember.presence.status !== newMember.presence.status) return;

  const oldGame = oldMember.presence.game && [0, 1].includes(oldMember.presence.game.type) ? true : false;
  const newGame = newMember.presence.game && [0, 1].includes(newMember.presence.game.type) ? true : false;

  if (!oldGame && newGame) {         // Started playing.
    newMember.addRole(playingRole)
      .then(() => console.log(`${playingRole.name} added to ${newMember.user.tag}.`))
      .catch(console.error);
  } else if (oldGame && !newGame) {  // Stopped playing.
    newMember.removeRole(playingRole)
      .then(() => console.log(`${playingRole.name} removed from ${newMember.user.tag}.`))
      .catch(console.error);
  }
});

// client.on('raw', packet => {
//   // We don't want this to run on unrelated packets
//   if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
//   // Grab the channel to check the message from
//   const channel = client.channels.get(packet.d.channel_id);
//   // There's no need to emit if the message is cached, because the event will fire anyway for that
//   if (channel.messages.has(packet.d.message_id)) return;
//   // Since we have confirmed the message is not cached, let's fetch it
//   channel.fetchMessage(packet.d.message_id).then(message => {
//       // Emojis can have identifiers of name:id format, so we have to account for that case as well
//       const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
//       // This gives us the reaction we need to emit the event properly, in top of the message object
//       const reaction = message.reactions.get(emoji);
//       // Adds the currently reacting user to the reaction's users collection.
//       if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
//       // Check which type of event it is before emitting
//       if (packet.t === 'MESSAGE_REACTION_ADD') {
//           client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
//       }
//       if (packet.t === 'MESSAGE_REACTION_REMOVE') {
//           client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
//       }
//   });
// });

// client.once('ready', () => {
//   const moment = require('moment');
//   const CronJob = require('cron').CronJob;
//   const channel = client.channels.find(chan => chan.name === '𝓜𝓪𝓲𝓷');
//   let answerlist = [
//     '**לילה טוב נשמות**' 
//     ,'**ואי אני גמור יאלה לילה טוב **'  
//     ,'**אני עיייייף זזתי לישון**'  
//     ,'**הגיע הזמן לישון, נא לא להפריע לי**'  
//     ,'**לילה!**'  
//     ,'**💤💤💤 לילה טובבב 💤💤💤**']
// let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];
//   var job = new CronJob({
//       cronTime: '00 59 23 * * *', //* * * * * every minute
//       onTick: function() {
//         const embed = new Discord.RichEmbed()
//         .setColor('#FFFF00')
//         .setTitle(ansxd)
//         .setFooter('הודעה אוטומטית')
//         .setImage('https://media.giphy.com/media/cAuwW15e54lFGXoMyc/giphy.gif')
//         .setTimestamp()
//         channel.send(embed).then(message => message.delete(21600000));
//         console.log(moment.tz('Israel').format('HH:mm:ss'))
//       },
//       start: false,
//       timeZone: 'Israel'
//  });
//   job.start();
// });

client.on('message', message => {
  
  if(message.content.includes('לילה טוב')) {
    if (message.author.bot) return;
      message.channel.send('לילה טוב גם לך' + message.author);
      
  }
});
client.on('message', message => {
  
  if(message.content.includes('בוקר טוב')) {
    if (message.author.bot) return;
      message.channel.send('בוקר טוב גם לך' + message.author);
      
  }
});

// client.once('ready', () => {
//   const moment = require('moment');
//   const CronJob = require('cron').CronJob;
//   const channel = client.channels.find(chan => chan.name === '𝓜𝓪𝓲𝓷');
//   let answerlist = ['**בוקר טוב נשמות**'  ,'**איזה בוקר! יאלה מי בא לים?!**'  ,'**ואי קמתי מאוחר חיב לפתוח את הגולג**'  ,'**בוקר טוב לכם גיימרים יקרים**'  ,'**קמתי!**'  ,'**🌅🌅🌅בוקר!🌅🌅🌅**']
// let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];
//   var job = new CronJob({
//       cronTime: '00 00 09 * * *', //* * * * * every minute
//       onTick: function() {
//         const embed = new Discord.RichEmbed()
//         .setColor('#FFFF00')
//         .setTitle(ansxd)
//         .setFooter('הודעה אוטומטית')
//         .setImage('https://media.giphy.com/media/TDLOCATcExXAm24MPm/source.gif')
//         .setTimestamp()
//         channel.send(embed).then(message => message.delete(21600000));
//         console.log(moment.tz('Israel').format('HH:mm:ss'))
//       },
//       start: false,
//       timeZone: 'Israel'
//  });
//   job.start();
// });

client.on('message', async message => {

  let botlist = ['noob', 'אייל גולן', 'יא הומו','נוב','גיי','בוט הומו','בוט זיין','בוט זין', 'בוט מוצץ', 'בוט מסריח', 'בוט מזדיין'] 

  let foundInText = false;
  for (var i in botlist) { 
    if (message.content.toLowerCase().includes(botlist[i].toLowerCase())) foundInText = true;
  }
    if (foundInText) {
      if (message.author.bot) return;
      //message.delete();

      let answerlist = [            '**גילית כבר שאתה הומו?**'
            ,'**קוקסינל מטומטם**'
            ,'**עכשיו אתה מבין למה אין לך חברים?**'
            ,'**לפי החישובים שלי נמצא כי אתה 100% גיי**'
            ,'**אתה צריך טיפול נשמה**'
            ,'**יש לי פסיכיאטרית מקצועית להביא לך מספר?**'
          ]
      
      let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];

      message.channel.send(message.author +'\xa0\xa0'+ ansxd);
  }
});

// client.on('message', async message => {

//   let botlist = [''] 

//   let foundInText = false;
//   for (var i in botlist) { 
//     if (message.content.toLowerCase().includes(botlist[i].toLowerCase())) foundInText = true;
//   }
//     if (foundInText) {
//       if (message.author.bot) return;
//       //message.delete();

//       let answerlist = [

//             ,'**כן זה אני**'
//             ,'**לא תתייג את שמי לשווא**'
//             ,'**מה הקטע שך סתם לקרוא לי?**'
//             ,'**אני חכם אתה טיפש**'
//             ,'**מה אתה רוצה?**'
//           ]
      
//       let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];

//       message.channel.send(message.author +'\xa0\xa0'+ ansxd);
//   }
// });



 client.on('message', async message => {

  let blacklisted = ['זיין', 'גאבנו', 'סוכה', 'מוצץ', 'זונה', 'שרמוטה', 'קוקסינל', 'תחת', 'חרא', 'בולבול', 'מכוער'
  , 'דפוק', 'אידיוט', 'חמור', 'מנייאק', 'מניאק', 'FUCK', 'fuck', 'מגעיל', 'טיפש',
   'pussy', 'PUSSY', 'ass', 'ASS', 'כוסרבאק', 'כוס', 'כוסאומו','כוסראבק', 'מנוול' , 'מנוולת' , 'זין','ז י ן','דבע','ינעל','גרוע','ימיזדיין','ז ו נ ה',' ש ר מ ו ט ה','ב י צ י ם'] 

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
            ,'**אני באמת לא מבין למה אתה צריך להשתמש בשפה כה בוטה כל הזמן**'
            ,'**למה לקלל למה**'
            ,'**אזהרה אחרונה!**'
            ,'**ההורים שלך בדוק אחים, צור קשר עם צופית גרנט**'
          ]
      
      let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];

      message.channel.send(message.author +'\xa0\xa0'+ ansxd);
  }
});

// client.on('message', message => {
  
//   if(message.content.includes('שיחה')) {
//     if (message.author.bot) return;

//     const embed = new Discord.RichEmbed()
//     .setColor("#0000FF")
//     .setTitle('תלחץ על הגויסטיק')
//     .setDescription('[🎮](https://discordapp.com/channels/583574396686434304/724579671403921459/724601371134918666)')

//       message.channel.send(embed);
      
//   }
// });

client.on('message', async message => {
  let orenuseless = 
  [

      "מי זורם למשחק ללא חילועים",
      "משהוא מעונין ברכיבה על סוס אולי?",
      "איך הסוס שלי?",
      "אני אהרון/אורן ואני אוהב סוסים",
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
   
   if(message.content === 'RED')
  
   {
      message.channel.send(factembed);
   }

   if(message.content === 'red')
  
   {
      message.channel.send(factembed);
   }

   if(message.content === 'DEAD')
  
   {
      message.channel.send(factembed);
   }

   if (message.author.bot) return;
});


client.on('message', async message => {
  let orenuseless = 
  [

      "מי בא לחלע?!",
      "אני רוני ולאחרונה אני מקולקל , בבקשה תוציאו אותי מהLOL",
      "יש משחק?!",
      "רק לא LOL בבקשה",
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



      // if(newMember.presence.game.name === 'ROBLOX') {  
      //     console.log('ROBLOX detected!');
      //     client.channels.get('583575179880431616').send(newMember.user + '\xa0\xa0\xa0' + '**\n ?אתה אמיתי שאתה משחק בחרא הזה \n**', {
      //         files: [
      //             "https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/ROBLOX.jpg"
      //             ]
      //         }).then(message => message.delete(3600000));
      //     }
      //     if(newMember.presence.game.name === 'League of Legends') {  
            
      //       const random = [
      //         'https://sd.keepcalms.com/i-w600/be-gay-and-play-league-of-legends.jpg',
      //         'https://i.imgur.com/MihhDQi.jpg',
      //         ]
      //       console.log('League of Legends detected!');
      //       client.channels.get('583575179880431616').send(newMember.user + '\n\n', {
      //           file: random[Math.floor(Math.random() * random.length)

      //               ]
                    
      //           }).then(message => message.delete(3600000));
                
      //       }



client.on('message', (message) => {
  if (message.content == 'בטל השתק') {
    message.delete(5000)
      let channel = message.member.voiceChannel;
      if(!channel) return message.channel.send('כנס קודם לערוץ שיחה יחמור').then(message => message.delete(10000).catch());
      for (let member of channel.members) {
          member[1].setMute(false)
          message.channel.send('🔇').then(message => message.delete(10000).catch());
      }
      if (message.author.bot) return
   }
});

client.on('message', message => {
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
  if (message.content.match(prefixMention)) {
    const embed2 = new Discord.RichEmbed()
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
   if(message.content === 'שראוד')
   {
      message.channel.send('https://en.wikipedia.org/wiki/Shroud_(gamer)');
   }

  if (message.author.bot) return;
  
});

client.on('message', async message => {

  let botlist = ['Maurice', 'מ ו ר י ס', 'maurice', 'מוריס', 'maurice', '539020416178454540', 'maurice'] 

  let foundInText = false;
  for (var i in botlist) { 
    if (message.content.toLowerCase().includes(botlist[i].toLowerCase())) foundInText = true;
  }
    if (foundInText) {
      if (message.author.bot) return;

      const embed1 = new Discord.RichEmbed()
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/moris0.jpg')
      const embed2 = new Discord.RichEmbed()
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/morismoris1.jpg')
      const embed3 = new Discord.RichEmbed()
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/morisblack.jpg')

      const answerlist = [embed1,embed2,embed3]
      
      let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];

      message.channel.send(ansxd);
  }
});

client.on('message', async message => {

  let botlist = ['מושה', 'מ ש ה', 'MOSHE', 'Moshe', '228555337542664192', 'moshe'] 

  let foundInText = false;
  for (var i in botlist) { 
    if (message.content.toLowerCase().includes(botlist[i].toLowerCase())) foundInText = true;
  }
    if (foundInText) {
      if (message.author.bot) return;

      const embed1 = new Discord.RichEmbed()
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/MOSHE2.gif')
      const embed2 = new Discord.RichEmbed()
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/MOSHED-2020-3-7-10-43-13.gif')
      const embed3 = new Discord.RichEmbed()
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/moshe.gif')

      const answerlist = [embed1,embed2,embed3]
      
      let ansxd = answerlist[Math.floor(Math.random() * answerlist.length)];

      message.react('🖼️').then(() => message.react('⛔'))
    
      const filter = (reaction, user) => {
          return ['🖼️', '⛔'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      message.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {const reaction = collected.first();
      
              if (reaction.emoji.name === '🖼️') {
                  message.reply(ansxd).then(message.delete(300000))
              }
              else {
                  message.reply('לא רוצה לא צריך');
              }
          })
          .catch(collected => {
              console.log(`${collected.size}`);
              message.reply('אין לי כח');
              
          });
  }
});

client.on('message', async message => {

  let dorlist = ['dor', 'ד ו ר', 'DOR', '334670838496231426', 'דור'] 

  let foundInText = false;
  for (var i in dorlist) { 
    if (message.content.toLowerCase().includes(dorlist[i].toLowerCase())) foundInText = true;
  }
    if (foundInText) {
      if (message.author.bot) return;
      
      const embed = new Discord.RichEmbed()
      .setTitle('🏋️‍♂️🏋️‍♂️🏋️‍♂️🏋️‍♂️🏋️‍♂️🏋️‍♂️🏋️‍♂️🏋️‍♂️🏋️‍♂️')
      .setColor("#E7A847")
      .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/dor.gif')

      message.react('🖼️').then(() => message.react('⛔'))
    
      const filter = (reaction, user) => {
          return ['🖼️', '⛔'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      message.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {const reaction = collected.first();
      
              if (reaction.emoji.name === '🖼️') {
                  message.reply(embed).then(message.delete(300000))
              }
              else {
                  message.reply('לא רוצה לא צריך');
              }
          })
          .catch(collected => {
              console.log(`${collected.size}`);
              message.reply('אין לי כח');
              
          });
    }
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
  
  if(message.content.includes('668791173216731136')) {
    if (message.author.bot) return;

    const embed = new Discord.RichEmbed()
    .setTitle('`🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓🤓`')
    .setColor("#FFC0CB")
    .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/alusin.gif')

      message.react('🖼️').then(() => message.react('⛔'))
    
      const filter = (reaction, user) => {
          return ['🖼️', '⛔'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      message.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {const reaction = collected.first();
      
              if (reaction.emoji.name === '🖼️') {
                  message.reply(embed).then(message.delete(300000))
              }
              else {
                  message.reply('לא רוצה לא צריך');
              }
          })
          .catch(collected => {
              console.log(`${collected.size}`);
              message.reply('אין לי כח');
              
          });
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
  
  if(message.content.includes('חכם')) {
    if (message.author.bot) return;
      message.channel.send('<a:veri:691980335235334155>');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('סעמק')) {
    if (message.author.bot) return;
      message.channel.send('ערס');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('דופק אותך')) {
    if (message.author.bot) return;
      message.channel.send('איפה לדפוק אותך?');
      
  }
});

client.on('message', message => {
  
  if(message.content.includes('אמא שלך')) {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+'אמא שלך **אוהבת** את השירותים שלי');
      
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

client.on('message', async message => {

  let songlist = ['תשיר', 'ש י ר', 'ישיר', 'נשיר','נגן','מנגינה'] 

  let foundInText = false;
  for (var i in songlist) { 
    if (message.content.toLowerCase().includes(songlist[i].toLowerCase())) foundInText = true;
  }
    if (foundInText) {
      if (message.author.bot) return;
      //message.delete();
 
        message.channel.send(message.author + '`הלו! תכתוב **שירים** תקבל תפלייליסט שלי! אני לא זמר חתונות!`');
  }
});

client.on('message', message => {
  if(message.content == 'מתן') {
    if (message.author.bot) return;
      message.channel.send(message.author +'\xa0\xa0'+ 'אם התכוונת לשמוע את השיר של מתן אז תרשום פליימתן');
  }
});


client.on('message', message => {
  if(message.content.includes('סבבה')) {
    if (message.author.bot) return;
      message.channel.send('`סבמבה`');
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
