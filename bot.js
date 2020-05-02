'use strict'

if (Number(process.version.slice(1).split('.')[0]) < 10) throw new Error('NodeJS 10.0.0 or higher is required. Re-run this with NodeJS 10.0.0+')
if (process.env.PREBOOT) eval(process.env.PREBOOT)
require('dotenv').config()

const Discord = require('discord.js')
const Enmap = require('enmap')
const client = new Discord.Client({
  
  disableEveryone: true,
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



//runs the message looker thingy
 client.on('message', async message => {
  //1 blacklisted words
  let blacklisted = ['זיין', 'גאבנו', 'סוכה', 'מוצץ', 'זונה', 'שרמוטה', 'קוקסינל', 'תחת', 'חרא', 'בולבול', 'מנייאק', 'דפוק', 'אידיוט', 'חמור', 'מנייאק', 'מניאק', 'FUCK', 'fuck', 'pussy', 'PUSSY', 'ass', 'ASS', 'כוסרבאק', 'כוס', 'כוסאומו','כוסראבק'] 

  //2 looking for words
  let foundInText = false;
  for (var i in blacklisted) { // loops through the blacklisted list
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
  // checks casesensitive words

  //3 deletes and send message
    if (foundInText) {
      if (message.author.bot) return;
      //message.delete();
      message.channel.send(message.author + '`סליחה! רק לי מותר לקלל פה יזיין`');
  }
});

client.on('message', async message => {
  let factsuseless = 
  [

      "אתה בא לחלע?!",
      "יש משחק?!",
      "אני חם!",
      "בוא נפרק!",
      "WARZONE?",
      "BR כן?!",

  ];

  let factnum = Math.floor((Math.random() * factsuseless.length));

  let factembed = new Discord.RichEmbed()
  .setAuthor(message.author)
  .setColor("#000000")
  .setTitle(factsuseless[factnum])
  .setImage('https://raw.githubusercontent.com/amiboko/MAINDISCRODJSBOT/master/img/RONICOD.gif')

  if(message.content.includes('קוד' && 'cod' && 'COD'))
   {
      message.channel.send(factembed);
   }

  if (message.author.bot) return
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


client.on('message', message => {
  
  if(message.content.includes('לשחק')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`יאלה אני בא`');
      
  }
});

client.on('message', message => {
  if(message.content === 'לא') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`למה אתה שלילי`');
  }
});

client.on('message', message => {
  if(message.content.includes('כן')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`כן?`');
  }
});

client.on('message', message => {
  if(message.content.includes('אחי')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`כולנו אחים`');
  }
});

client.on('message', message => {
  if(message.content.includes('סבבה')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`סבמבה`');
  }
});

client.on('message', message => {
  if(message.content === '?') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`תרשום עזרה תקבל עזרה`');
  }
});

client.on('message', message => {
  if(message.content === '??') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`מה הסיפור שלך?`');
  }
});

client.on('message', message => {
  if(message.content === '???') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`יש מצב שאתה גיי?`');
  }
});

client.on('message', message => {
  if(message.content === '????') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`טוב מה נסגר איתך?`');
  }
});

client.on('message', message => {
  if(message.content === '?????') {
    if (message.author.bot) return;
      message.channel.send(message.author + '`מה אתה רוצה?`');
  }
});

for (let i = 0; i < client.config.permLevels.length; i++) {
  const currentlevel = client.config.permLevels[i]
  client.levelCache[currentlevel.name] = currentlevel.level
}

client.login(process.env.token)

module.exports = client
