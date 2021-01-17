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
		if (settings.modLogChannel2 && message.guild.channels.find(c => c.name == settings.modLogChannel2)) {
				const modLogChannel2 = message.guild.channels.find(c => c.name == settings.modLogChannel2)
				if (!modLogChannel2.permissionsFor(message.guild.me).has('VIEW_CHANNEL')) return
				if (!modLogChannel2.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return
				
			const embed = new Discord.RichEmbed()
				.setAuthor('✍🏼 הודעה נערכה ✍🏼')
				.setColor(colors.default)
				.setDescription(`נערך ב${message.channel}`)
				.setFooter('הודעה אוטומטית')
				.addField('הודעה ישנה', `${message}`, true)
				.addField('הודעה חדשה', `${messageNew}`, true)
				.setThumbnail(client.user.avatarURL)
				.setTimestamp()
				

			if (message.guild.channels.find(channel => channel.name == settings.modLogChannel2)) {
				message.guild.channels.find(channel => channel.name == settings.modLogChannel2).send(embed).catch()
			}
		}
  }
}
