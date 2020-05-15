const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, message, messageNew) => {
  if (message.author.bot) return
  if (message.guild === null)
  if (message.pinned && !messageNew.pinned) return
  if (!message.pinned && messageNew.pinned) return
  if (message.content === messageNew.content) return

  const settings = client.getSettings(message.guild.id)

  if (settings.logMessageUpdates == 'true') {
		if (settings.modLogChannel && message.guild.channels.find(c => c.name == settings.modLogChannel)) {
				const modLogChannel = message.guild.channels.find(c => c.name == settings.modLogChannel)
				if (!modLogChannel.permissionsFor(message.guild.me).has('VIEW_CHANNEL')) return
				if (!modLogChannel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return
				
			const embed = new Discord.RichEmbed()
				.setAuthor('✍🏼 הודעה נערכה ✍🏼')
				.setColor(colors.default)
				.setDescription(`נערך ב${message.channel}`)
				.setFooter('הודעה אוטומטית')
				// .addField('Old message:', `${message}`, true)
				// .addField('New message:', `${messageNew}`, true)
				

			if (message.guild.channels.find(channel => channel.name == settings.modLogChannel)) {
				message.guild.channels.find(channel => channel.name == settings.modLogChannel).send(embed).catch()
			}
		}
  }
}
