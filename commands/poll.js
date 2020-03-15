const Discord = require('discord.js')


module.exports.run = async (bot, message, args, Invite) => {

  let Invite = message.guild.channels.first().createInvite()
  let Owner = message.author;
  if(Owner.id !== "ID 1" && Owner.id !== "ID 2") return message.reply("Only the bot owner can use this command!") //you need to add your id and another one if you want
 
  const id = args.shift();
  const sayMessage = args.join(" ")
  if(!sayMessage) return message.reply("Usage `dm + ID + your message`")
  

 let contact = new Discord.RichEmbed()
 .setAuthor(Owner.username)
 .setColor("00ff00")
 .setTitle("New dm")
 .addField("Response:", sayMessage)
 .addField("Server message departure:", message.guild.name)
 .setTimestamp()

  bot.users.get(id).send(contact);

  let chanemb = new Discord.RichEmbed()
  .setColor("#00ff00")
  .setDescription(`Message sent to <@${id}>`);

  message.channel.send(chanemb).then(msg => {msg.delete(5000)});


      message.delete();

    }
    module.exports.help = {
      name: "dm",
      description: 'Owner Only',
      usage: 'dm <ID> <message>'
    }
