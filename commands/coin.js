exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const sides = ['עץ', 'פלי']
  const side = sides[Math.floor(Math.random() * sides.length)]
  message.channel.send(' מטבע נחת על ' + side  +  '!')
}

exports.conf = {
  enabled: true,
  aliases: ['מטבע', 'עץ', 'פלי'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'מטבע',
  category: 'כיף',
  description: 'תטיל מטבע',
  usage: 'מטבע'
}
