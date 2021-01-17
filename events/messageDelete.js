const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, message) => {
  	if (message.author.bot) return
    if (message.guild === null) return

  	const settings = client.getSettings(message.guild.id)
  	if (settings.logMessageUpdates == 'true') {
			if (settings.modLogChannel2 && message.guild.channels.find(c => c.name == settings.modLogChannel2)) {
				const modLogChannel2 = message.guild.channels.find(c => c.name == settings.modLogChannel2)
				if (!modLogChannel2.permissionsFor(message.guild.me).has('VIEW_CHANNEL')) return
				if (!modLogChannel2.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return

				const embed = new Discord.RichEmbed()
					.setAuthor('🗑️ הודעה נמחקה 🗑️')
					.setColor(colors.default)
					.addField('המוחק המחוק', `<@${message.author.id}>`, true)
					.setDescription(`נמחק ב${message.channel}`)
					.setFooter('הודעה אוטומטית')
					.setThumbnail(client.user.avatarURL)
					.setTimestamp()
					
				modLogChannel2.send(embed)
			}
  	}
}
