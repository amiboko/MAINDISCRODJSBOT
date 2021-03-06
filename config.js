// Put member IDs in these for special perms, competely optional

const config = {
  owners: ['524302700695912506'],
  managers: [],
  movers: ['323057908654931968','228555337542664192','798592041738436649'],
  admins: [],
  devs:[],
  mods:[],
  support: [],
  helpers: [],
  token: [],
  

  blacklisted: [],

  defaultSettings: {
    prefix: '',
  language: 'en-US',
    modLogChannel: '𝙒𝙀𝙇𝘾𝙊𝙈𝙀',
    modLogChannel2: '𝙐𝙋𝘿𝘼𝙏𝙀𝙎',
    modRole: '',
    adminRole: 'Administrator',
    muteRole: 'Muted',
    noPermissionNotice: 'true',
    deniedChannel: '𝙒𝙀𝙇𝘾𝙊𝙈𝙀',
		acceptedChannel: '𝙒𝙀𝙇𝘾𝙊𝙈𝙀',
    welcomeChannel: '𝙒𝙀𝙇𝘾𝙊𝙈𝙀',
    welcomeMessage: '',
    welcomeEnabled: 'true',
    pointsEnabled: 'true',
    logMessageUpdates: 'true',
    logChannelUpdates: 'true',
    logEmojiUpdates: 'true',
    logMemberUpdates: 'true',
    starboardChannel: '𝙒𝙀𝙇𝘾𝙊𝙈𝙀'
  },

  permLevels: [
    {
      level: 0,
      name: 'Blacklisted',

      check: () => true
    },

    {
      level: 1,
      name: 'User',

      check: (message) => !config.blacklisted.includes(message.author.id) || !config.globalBan.includes(message.author.id)
    },

    {
      level: 2,
      name: 'MOVER',

      check: (message) => config.movers.includes(message.author.id)
    },

    // {
    //   level: 2,
    //   name: 'Moderator',

    //   check: (message) => {
    //     try {
    //       const modRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase())
    //       if (modRole && message.member.roles.has(modRole.id) || message.member.hasPermission('MANAGE_MESSAGES')) return true
    //     } catch (e) {
    //       return false
    //     }
    //   }
    // },

    {
      level: 3,
      name: 'Administrator',

      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase())
          if (message.member.roles.has(adminRole.id) || message.member.hasPermission('ADMINISTRATOR')) return true
        } catch (e) {
          return false
        }
      }
    },

    {
      level: 4,
      name: 'Server Owner',

      check: (message) => message.channel.type === 'text' ? (message.guild.ownerID === message.author.id) : false
    },

    {
      level: 5,
      name: 'Bot Helper',

      check: (message) => config.helpers.includes(message.author.id)
    },

    {
      level: 6,
      name: 'Bot Support',

      check: (message) => config.support.includes(message.author.id)
    },

    {
      level: 7,
      name: 'Bot Moderator',

      check: (message) => config.mods.includes(message.author.id)
    },

    {
      level: 8,
      name: 'Bot Dev',

      check: (message) => config.devs.includes(message.author.id)
    },

    {
      level: 9,
      name: 'Bot Admin',

      check: (message) => config.admins.includes(message.author.id)
    },

    {
      level: 10,
      name: 'Bot Manager',

      check: (message) => config.admins.includes(message.author.id)
    },

    {
      level: 11,
      name: 'Bot Owner',

      check: (message) => config.owners.includes(message.author.id)
    }
  ]
}

module.exports = config