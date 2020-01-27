const request = require('request')

module.exports = async client => {
  const statusList = [
    { msg: 'WIYH MAURICE', type: 'PLAYING' },
    { msg: 'WITH ALEX', type: 'PLAYING' },
    { msg: 'פקודות', type: 'PLAYING' },
    { msg: 'WITH MATAN', type: 'PLAYING' },
    { msg: `WITH ROSLANA`, type: 'PLAYING' },
    { msg: 'Battlefield V', type: 'PLAYING' },
    { msg: 'עזרה', type: 'PLAYING' },
    { msg: 'YOU', type: 'WATCHING' },
    { msg: 'NETFLIX', type: 'WATCHING' },
    { msg: 'משה מתקלח', type: 'WATCHING' },
    { msg: 'WITH MOSHE', type: 'PLAYING' },
    { msg: `PORN`, type: 'WATCHING' },
    { msg: 'YOU', type: 'LISTENING' }
  ]

  setInterval(async () => {
    const index = Math.floor(Math.random() * statusList.length + 1) - 1
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    })
  }, 60000)

  /* setInterval(async () => {
    request('https://web.tsuyobot.ga', (err, res, html) => {
      if (err) client.logger.error(err);
    });
}, 28000); */

  client.user.setStatus('online')
  console.log('Finished setting up the bot.')

  // Starts the web server/API
  // require('../modules/web')(client);
}
