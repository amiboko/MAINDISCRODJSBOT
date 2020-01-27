const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const Icon = message.guild.iconURL === null
    ? 'https://cdn.discordapp.com/avatars/635882115661168681/f89185e2ba2d0a5c30d8257681a7af9e.png' : message.guild.iconURL
  const verified = message.guild.verified !== true ? 'ממש לא' : 'בהחלט'
  const afk_channel = message.guild.afkChannel === null ? '**אין ערוץ כזה**' : message.guild.afkChannel

  let region = ''
  if (message.guild.region === 'brazil') region = ':flag_br: Brazil'
  if (message.guild.region === 'central-europe') region = ':flag_eu: Central Europe'
  if (message.guild.region === 'western-europe') region = ':flag_eu: Western Europe'
  if (message.guild.region === 'hong-kong') region = ':flag_hk: Hong Kong'
  if (message.guild.region === 'india') region = ':flag_in: India'
  if (message.guild.region === 'japan') region = ':flag_jp: Japan'
  if (message.guild.region === 'russia') region = ':flag_ru: Russia'
  if (message.guild.region === 'singapore') region = ':flag_sg: Singapore'
  if (message.guild.region === 'south-africa') region = ':flag_za: South Africa'
  if (message.guild.region === 'sydney') region = ':flag_au: Australia'
  if (message.guild.region === 'us-central') region = ':flag_us: US Central'
  if (message.guild.region === 'us-east') region = ':flag_us: US East'
  if (message.guild.region === 'us-south') region = ':flag_us: US South'
  if (message.guild.region === 'us-west') region = ':flag_us: US West'

  const embed = new Discord.RichEmbed()
    .setColor(colors.default)
    .setThumbnail(Icon)
    .setFooter(`${message.guild.id}`,
      'https://cdn.discordapp.com/avatars/635882115661168681/f89185e2ba2d0a5c30d8257681a7af9e.png')
    .setTitle(`${message.guild.name}`)

    .addField('יוצר', `${message.guild.owner}`, true)
    .addField('משתמשים', `${message.guild.memberCount}`, true)
    .addField('מאושר?', `${verified}`)
    .addField('תאריך לידה', `${message.guild.createdAt}`, true)
    .addField('AFK', `${afk_channel}\n **זמן שינה** ${message.guild.afkTimeout} שניות`, true)
    .addField('מיקום', `${region}`, true)
    .setTimestamp()

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['שרת'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'שרת',
  category: 'כלים',
  description: 'קצת פרטים על השרת',
  usage: 'שרת'
}
