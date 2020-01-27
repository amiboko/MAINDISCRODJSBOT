const Discord = require('discord.js')
const randomPuppy = require('random-puppy')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => {
  const subReddits = ['dankmeme', 'meme', 'memes', 'spicy_memes', 'me_irl']
  const random = subReddits[Math.floor(Math.random() * subReddits.length)]

  const img = await randomPuppy(random)
  const embed = new Discord.RichEmbed()
    .setColor(colors.default)
    .setImage(img)

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['מם','מים','מ','meme',],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מם',
  category: 'כיף',
  description: 'פשוטו כמשמעו',
  usage: 'meme | מם'
}
