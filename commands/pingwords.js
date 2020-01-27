const Discord = require('discord.js')
const colors = require('../lib/colors.json')

exports.run = async (client, message, args) => {
  if (message.author.bot === true) return
  if (!args[0]) return message.channel.send('מה תרצה לעשות ... הוסף|הסר|רשימה')

  // Ensure this user has gotten rep before
  client.pingwords.ensure(`${message.author.id}`, {
    user: message.author.id,
    pingOne: null,
    pingTwo: null,
    pingThree: null,
  })
    
  const pingOne = client.pingwords.get(`${message.author.id}`, 'pingOne')
  const pingTwo = client.pingwords.get(`${message.author.id}`, 'pingTwo')
  const pingThree = client.pingwords.get(`${message.author.id}`, 'pingThree')
    
  if (args[0] === 'הוסף') {
    if (!args[1]) return message.channel.send('מה המילה שאותה תרצה להוסיף')
    if (!args[2]) return message.channel.send('תיהיה יותר מדויק, הוסף_{מילה} 1|2|3')
    if (args[2] === '1' || args[2] === '2' || args[2] === '3') {
      let slot = ''
      if (args[2] === '1') slot = 'pingOne'
      if (args[2] === '2') slot = 'pingTwo'
      if (args[2] === '3') slot = 'pingThree'
      if (args[2] > 3) return message.channel.send('אל תיסחף, מותר לך עד 3 מילים')
			
      client.pingwords.set(`${message.author.id}`, args[1].toLowerCase(), slot)
			const embed = new Discord.RichEmbed()
				.setAuthor('הודעות פרטיות')
				.setColor(colors.green)
				.setDescription(`הוספת את \`${args[1].toLowerCase()}\` ל \`${args[2]}\``)     
      return message.channel.send(embed)
    }
    
    message.channel.send('היכן תרצה להציב את המילה אותה בחרת')
  }
  
  if (args[0] === 'הסר') {
    if (!args[1]) return message.channel.send('מה המילה אותה תרצה להסיר')
    if (args[1] === '1') {
      if (pingOne === null) return message.channel.send('אין לך מילה במערך הזה')
      client.pingwords.set(`${message.author.id}`, null, 'pingOne')
			const embed = new Discord.RichEmbed()
				.setAuthor('הודעות פרטיות')
				.setColor(colors.green)
				.setDescription(`מחקת את \`${args[1]}\``)
      return message.channel.send(embed)
    }
    
    if (args[1] === '2') {
      if (pingTwo === null) return message.channel.send('אין לך מילה במערך הזה')
      client.pingwords.set(`${message.author.id}`, null, 'pingTwo')
			const embed = new Discord.RichEmbed()
				.setAuthor('הודעות פרטיות')
				.setColor(colors.green)
				.setDescription(`מחקת את \`${args[1]}\``)
      return message.channel.send(embed)
    }
    
    if (args[1] === '3') {
      if (pingThree === null) return message.channel.send('אין לך מילה במערך הזה')
      client.pingwords.set(`${message.author.id}`, null, 'pingThree')
			const embed = new Discord.RichEmbed()
				.setAuthor('הודעות פרטיות')
				.setColor(colors.green)
				.setDescription(`מחקת את \`${args[1]}\``)
      return message.channel.send(embed)
    }
		
		return message.channel.send('משהו בבחירה שלך לא תקין, פשוט תסיר אחת ; _הסר 1|2|3')
		
  }
  
  if (args[0] === 'רשימה') {
		const embed = new Discord.RichEmbed()
			.setAuthor('הודעות פרטיות')
			.setColor(colors.default)
			.addField('1:', pingOne, true)
			.addField('2:', pingTwo, true)
			.addField('3:', pingThree, true)
    return message.channel.send(embed)
  }
	
	message.channel.send('ערך לא תקין, יש להשתמש רק ב_הוסף|הסר|רשימה')
}

exports.conf = {
  enabled: true,
  aliases: ['מילה', 'הודעה', 'פרטי'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'הודעה',
  category: 'כלים',
  description: 'שולח הודעות פרטיות לפי הגדרתך',
  usage: 'הודעה | פרטי | מילה _הוסף|הסר|רשימה'
}
