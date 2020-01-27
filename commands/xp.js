exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args[0] === 'תן') {
    // Limited to guild owner
    if (message.author.id !== message.guild.ownerID) { return message.reply("נשמה תיצור בוט לעצמך ותגדיר אותו איך שבא לך") }

    const user = message.mentions.users.first() || client.users.get(args[0])
    if (!user) return message.reply('תייג משהוא')

    const pointsToAdd = parseInt(args[2], 10)
    if (!pointsToAdd) return message.reply("?כמה נקודות לתת")

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    })

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, 'points')
    userPoints += pointsToAdd

    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, 'points')

    message.channel.send(`${user} קיבל ${pointsToAdd} נקודות ועומד על ${userPoints} נקודות`)
    return
  }

  if (args[0] === 'קח') {
    // Limited to guild owner
    if (message.author.id !== message.guild.ownerID) { return message.reply("הלו הלו משטרה יש פה שוד הלילה") }

    const user = message.mentions.users.first() || client.users.get(args[0])
    if (!user) return message.reply('תייג משהוא')

    const pointsToTake = parseInt(args[2], 10)
    if (!pointsToTake) return message.reply("?כמה נקודות לקחת")

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    })

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, 'points')
    userPoints -= pointsToTake

    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, 'points')

    message.channel.send(`${user} הפסדת ${pointsToTake} נקודות ועכשיו אתה עומד על ${userPoints} נקודות`)
    return
  }

  const key = `${message.guild.id}-${message.author.id}`
  const xp = client.points.get(key, 'points')
  const level = client.points.get(key, 'level')
  const number = ((5 * (level + 1)) ** 2) - xp

  message.channel.send(`יש לך כרגע ${xp}XP, והרמה שלך היא ${level}!`)
  message.channel.send(`אתה צריך ${number}XP בשביל לעלות לרמה ${level + 1}`)
}

exports.conf = {
  enabled: true,
  aliases: ['רמה'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'רמה',
  category: 'כלים',
  description: 'מראה כמה נקודות צברת ואפשר גם לפרגן ולעקוץ חברים',
  usage: 'רמה + קח|תן'
}
