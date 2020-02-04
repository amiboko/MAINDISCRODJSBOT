const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, member) => {
 	const settings = client.getSettings(member.guild.id)
 	if (settings.welcomeEnabled !== 'true') return

  const welcomeChannel = member.guild.channels.find(c => c.name == settings.welcomeChannel)

 	if (settings.welcomeMessage && welcomeChannel) {
    if (!welcomeChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return
    if (!welcomeChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return

    // TODO: Better way of doing this
    if (settings.welcomeMessage.includes('{{name}}')) { // If includes {{name}}
      if (settings.welcomeMessage.includes('{{mention}}')) { // If includes {{name}} and {{mention}}
        if (settings.welcomeMessage.includes('{{members}}')) { // If includes {{name}}, {{mention}} and {{members}}
          const welcomeMessage = settings.welcomeMessage.replace('{{name}}', member.user.tag).replace('{{mention}}', '<@' + member.user.id + '>').replace('{{members}}', member.guild.memberCount)
          welcomeChannel.send(welcomeMessage)
        } else {
          const welcomeMessage = settings.welcomeMessage.replace('{{name}}', member.user.tag).replace('{{mention}}', '<@' + member.user.id + '>')
          welcomeChannel.send(welcomeMessage)
        }
      } else {
        const welcomeMessage = settings.welcomeMessage.replace('{{name}}', member.user.tag).replace('{{mention}}', '<@' + member.user.id + '>').replace('{{members}}', member.guild.memberCount)
        welcomeChannel.send(welcomeMessage)
      }
    } else {
      if (settings.welcomeMessage.includes('{{mention}}')) { // If includes {{mention}}
        if (settings.welcomeMessage.includes('{{members}}')) { // If includes {{mention}} and {{members}}
          const welcomeMessage = settings.welcomeMessage.replace('{{mention}}', '<@' + member.user.id + '>').replace('{{members}}', member.guild.memberCount)
          welcomeChannel.send(welcomeMessage)
        } else {
          const welcomeMessage = settings.welcomeMessage.replace('{{mention}}', '<@' + member.user.id + '>')
          welcomeChannel.send(welcomeMessage)
        }
      } else {
        if (settings.welcomeMessage.includes('{{members}}')) { // If includes {{members}}
          const welcomeMessage = settings.welcomeMessage.replace('{{members}}', member.guild.memberCount)
          welcomeChannel.send(welcomeMessage)
        } else { // If doesn't contain any variables
          welcomeChannel.send(settings.welcomeMessage)
        }
      }
    }
  }

  if (settings.logMessageUpdates === 'true') {
    const modLogChannel = member.guild.channels.find(c => c.name === settings.modLogChannel)
    if (settings.modLogChannel && modLogChannel) {
      if (!modLogChannel.permissionsFor(member.guild.me).has('VIEW_CHANNEL')) return
      if (!modLogChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) return

      const embed = new Discord.RichEmbed()
        .setAuthor('📥 ברוך הבא')
        .setColor(colors.green)
        .setDescription(`**סהכ משתמשים** \`${member.guild.memberCount}\`\n<@${member.user.id}> הצטרף לשרת`)
        .setThumbnail(`${member.user.displayAvatarURL}`)
        .setTimestamp()

      modLogChannel.send(embed)
 		}
  }
}
