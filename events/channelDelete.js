const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, channel) => {
  	const settings = client.getSettings(channel.guild.id)
  	if (settings.logChannelUpdates == 'true') {
    if (settings.modLogChannel2 && channel.guild.channels.find(c => c.name == settings.modLogChannel2)) {
      const modLogChannel2 = channel.guild.channels.find(c => c.name == settings.modLogChannel2)
      if (!modLogChannel2.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return
      if (!modLogChannel2.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return

      const embed = new Discord.RichEmbed()
        .setAuthor('🗑️ ערוץ נמחק 🗑️')
        .setColor(colors.red)
        .setDescription(`\`${channel.name}\``)
        .setFooter('הודעה אוטומטית')
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()

      modLogChannel2.send(embed)
    }
  	}
}
