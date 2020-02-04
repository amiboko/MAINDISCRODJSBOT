const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, member) => {
 	const settings = client.getSettings(member.guild.id)
 	if (settings.logMessageUpdates === 'true') {
    if (settings.modLogChannel && member.guild.channels.find(c => c.name == settings.modLogChannel)) {
      const modLogChannel = member.guild.channels.find(c => c.name == settings.modLogChannel)
      if (!modLogChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return
      if (!modLogChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return

      const embed = new Discord.RichEmbed()
        .setAuthor('📤 ביי ביי')
        .setColor(colors.red)
        .setDescription(`**סהכ משתמשים** \`${member.guild.memberCount}\`\n<@${member.user.id}> עזב אותנו`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .setTimestamp()

      modLogChannel.send(embed)
    }
  }
}
