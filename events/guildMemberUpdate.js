const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, oldMember, newMember) => {
  let embed
  const settings = client.getSettings(oldMember.guild.id)

  if (!settings.logMemberUpdates == true) return
  if (!settings.modLogChannel) return
  if (!oldMember.guild.channels.find(c => c.name == settings.modLogChannel2)) return
  const modLogChannel = oldMember.guild.channels.find(c => c.name == settings.modLogChannel2)
  if (!modLogChannel.permissionsFor(oldMember.guild.me).has('VIEW_CHANNEL')) return
  if (!modLogChannel.permissionsFor(oldMember.guild.me).has('SEND_MESSAGES')) return

  if (oldMember.nickname !== newMember.nickname) {
    const embed = new Discord.RichEmbed()
      .setAuthor('👤 זיהוי עריכת שם 👤')
      .setColor(colors.default)
      .setDescription(`שינה את שמו <@${newMember.id}>`)
      .addField('ישן', `${oldMember.nickname !== undefined ? `${oldMember.nickname}` : oldMember.username}`, true)
      .addField('חדש', `${newMember.nickname !== undefined ? `${newMember.nickname}` : oldMember.username}`, true)
      .setThumbnail(`${oldMember.user.displayAvatarURL}`)
      

      modLogChannel.send(embed).catch()
  	}

  	if (oldMember.user.name !== newMember.user.name) {
    const embed = new Discord.RichEmbed()
      .setAuthor('👤 זיהוי עריכת שם 👤')
      .setColor(colors.default)
      .setDescription(`שינה את שמו <@${newMember.id}>`)
      .addField('ישן', `${oldMember.username}`, true)
      .addField('חדש', `${newMember.username}`, true)
      .setThumbnail(`${oldMember.user.displayAvatarURL}`)
      .setFooter('הודעה אוטומטית')

      modLogChannel.send(embed).catch()
    }
}