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
        .setAuthor('𝓑𝓨𝓔 𝓑𝓨𝓔')
        .setColor(colors.red)
        .setDescription(`\n**סהכ משתמשים** \`${member.guild.memberCount}\`\n\n<a:pica:693846940743499846> \xa0\xa0 עזב אותנו <@${member.user.id}>`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        

      modLogChannel.send(embed)
    }
  }
}
