exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send(`מה אתה קונה?!? מטומטם אתה באמא שלי הבוטית`)
  const items = ['דילדו', 'קונדום', 'ירוק', 'למבורגיני', 'טבעת']
  if (!items.includes(args[0])) return message.channel.send('מוצר לא קיים')
  if (!args[1]) return message.channel.send(`כמה אתה רוצה יקמצן מסריח...???`)
  if (isNaN(args[1])) return message.channel.send(`${args[1]} קמצן אתה באלוקים`)
  
  const key = `${message.author.id}`

  client.money.ensure(key, {
    member: key,
    money: 0
  })
  
  client.inventory.ensure(key, {
    member: key,
    dildo: 0,
    condom: 0,
    green: 0,
    ring: 0,
    lambo: 0,
  })
  
  const money = client.money.get(key, 'money')

  function buyItem(money, price, quantity, item) {
    const total = price * quantity
    if (money < price * quantity) return message.channel.send('אין לך מספיק כסף, לך חפש תחברים שלך')
    
    client.money.set(key, money - total, 'money')
    const items = item > 1 ? item : item + ''
    message.channel.send(`קנית \`${args[1]}\` ${items} ב₪${price * quantity}
    \n **יתרה נוכחית:** \`${money - total}\``)
    
    if (args[0] === 'דילדו') {
      const number = client.inventory.get(key, 'dildo')
      client.inventory.set(key, args[1] + number, 'dildo')
    }
    
    if (args[0] === 'ירוק') {
      const number = client.inventory.get(key, 'green')
      client.inventory.set(key, args[1] + number, 'green')
    }
    
    if (args[0] === 'קונדום') {
      const number = client.inventory.get(key, 'condom')
      client.inventory.set(key, args[1] + number, 'condom')
    }
    if (args[0] === 'טבעת') {
      const number = client.inventory.get(key, 'ring')
      client.inventory.set(key, args[1] + number, 'ring')

    }
    if (args[0] === 'למברוגיני') {
      const number = client.inventory.get(key, 'lambo')
      client.inventory.set(key, args[1] + number, 'lambo')

    }
  }
  
  if (args[0] === 'דילדו') {
    const dildo = args[0] > 1 ? 'דילדו' : 'ויברטור'
    buyItem(money, 100, args[1], dildo)
  }
  
  if (args[0] === 'ירוק') {
    const green = args[0] > 1 ? 'ירוק' : 'ירוק'
    buyItem(money, 50, args[1], green)
  }
  
  if (args[0] === 'קונדום') {
    const condom = args[0] > 1 ? 'קונדום' : 'קונדום'
    buyItem(money, 10, args[1], condom)
}
  if (args[0] === 'טבעת') {
    const ring = args[0] > 1 ? 'טבעת' : 'טבעת נישואין'
    buyItem(money, 10000, args[1], ring)
    }

  if (args[0] === 'למבורגיני') {
      const lambo = args[0] > 1 ? 'למבורגיני' : 'למבו'
      buyItem(money, 1000000, args[1], lambo)
    }
  }


exports.conf = {
  enabled: true,
  aliases: ['קנה'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'קנה',
  category: 'הימורים',
  description: 'קנה מוצר מהחנות',
  usage: 'קנה _שם מוצר'
}
