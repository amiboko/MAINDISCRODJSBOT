/* 
	TODO:
		- Switch to a whitelist instead of all servers.
		- Allow blacklisted strings. E.g: don't get pinged by "Venk:" but get pinged by "Venk".
		- Blacklist people from being allowed to ping you
*/	

const fs = require('fs')
const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, message) => {
  if (message.guild === null) return
  
  const pingEmbed = new Discord.RichEmbed()
    .setColor(colors.default)
    .setAuthor(`הודעות פרטיות`)
    .addField(`${message.guild.name} (#${message.channel.name})`, `<@${message.author.id}>\n${message.content}\n[העדוהה תא תוארל יילע ץחל](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
    .setTimestamp();

    client.users.forEach(user => {
      // Ensure this user has ping words
      client.pingwords.ensure(`${user.id}`, {
        user: user.id,
        pingOne: null,
        pingTwo: null,
        pingThree: null
      })

      const pingOne = client.pingwords.get(`${user.id}`, 'pingOne')
      const pingTwo = client.pingwords.get(`${user.id}`, 'pingTwo')
      const pingThree = client.pingwords.get(`${user.id}`, 'pingThree')
			
			const one = pingOne === null ? 'null' : pingOne
			const two = pingTwo === null ? 'null' : pingTwo
			const three = pingThree === null ? 'null' : pingThree

      if (message.content.toLowerCase().includes(one) || message.content.toLowerCase().includes(two) || message.content.toLowerCase().includes(three)) { // For early pingwords participants we need to force ping words to be lowercase
        const guild = client.guilds.get(message.guild.id)
        if (message.content.includes('null')) return // DO NOT SEND MESSAGE TO EVERY USER
        if (!guild.member(user.id)) return // If member is not in the guild, why ping them?
        user.send(pingEmbed).catch((e) => {})
    }
  })
}
