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



client.on('ready', () => {
    const CronJob = require('cron').CronJob;
    var job = new CronJob('*/15 * * * *', 

      function job() {
      const embed = new Discord.RichEmbed()
      .setColor(0x8644ba)
      .setDescription('test')
      .then(() => client.channels.get('673211967216812068').send(embed)
      )}
)});



client.on('presenceUpdate', (oldMember, newMember) => {
  const guild = newMember.guild;
  const playingRole = guild.roles.find(role => role.id === '671635962228637696');

  if (newMember.user.bot || newMember.presence.clientStatus === 'mobile' || oldMember.presence.status !== newMember.presence.status) return;

  const oldGame = oldMember.presence.game && [0, 1].includes(oldMember.presence.game.type) ? true : false;
  const newGame = newMember.presence.game && [0, 1].includes(newMember.presence.game.type) ? true : false;

  if (!oldGame && newGame) {         
    newMember.addRole(playingRole)

    .then(() => client.channels.get(`673211967216812068`)
    .send(`${newMember.user}` +   '  '  + '▶️' +  '  '  + `${newMember.presence.game.name}`))

  } else if (oldGame && !newGame) {  
    newMember.removeRole(playingRole)
      .then(() => console.log(`${playingRole.name} removed from ${newMember.user.tag}.`))
      .catch(console.error);
  }
});


client.on('message', message => {
  
  if(message.content.includes('משחק')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`יאלה בוא אני זורם`');
      
  }
});

client.on('message', message => {
  if(message.content.includes('לא')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`למה אתה שלילי`');
  }
});

client.on('message', message => {
  if(message.content.includes('כן')) {
    if (message.author.bot) return;
      message.channel.send(message.author + '`אני אוהב שאתה חיובי`');
  }
});

client.on('message', message => {
  if(message.content.includes('?')) {
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
