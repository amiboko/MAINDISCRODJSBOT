const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, guild, user) => {
  const settings = client.getSettings(guild.id)
  const modLogChannel = guild.channels.find(c => c.name === settings.modLogChannel)
  
  if (guild === null) return

  if (settings.logMessageUpdates == 'true') {
	if (settings.modLogChannel && guild.channels.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = guild.channels.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return

	  const embed = new Discord.RichEmbed()
        .setTitle('משתמש קיבל באן')
        .setColor(colors.red)
        .setDescription(`**סהכ משתמשים** \`${guild.memberCount}\` \n\n <@${user.id}>`)
        .setThumbnail(user.displayAvatarURL)
        .setFooter('הודעה אוטומטית')
        .setTimestamp()

		modLogChannel.send(embed)
    }
  }
}
