const Discord = require('discord.js')
const rhyme = require('rhyme')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args[0]) return message.channel.send('איזו מילה בא לך שאני יחפש')

  const msg = await message.channel.send(
    new Discord.RichEmbed()
      .setColor(colors.default)
      .setDescription('🔍🔍🔍🔍🔍🔍🔍🔍🔍')
      .setFooter('יש רק באנגלית...עברית שפה מכוערת')
  )

  rhyme(async (rl) => {
    	let rhymes = ''
      	const words = rl.rhyme(args.join(' '))

      	words.forEach(word => {
        	rhymes += word.toPropperCase() + ', '
      	})

      	rhymes = rhymes.slice(0, -2)

    const embed = new Discord.RichEmbed()
      .setTitle(`${args[0]}`)
      .setColor(colors.default)
      .setDescription(`${rhymes || 'לא נמצא'}`)
      .setFooter('😂😂😂😂😂😂😂')

    msg.edit(embed)
  })
}

exports.conf = {
  enabled: true,
  aliases: ['חרוז','harooz','h'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'חרוז',
  category: 'כיף',
  description: 'מחזיר חרוז למילה באנגלית, אין בעברית... עברית שפה פח',
  usage: 'amos _ harooz | h | חרוז'
}
