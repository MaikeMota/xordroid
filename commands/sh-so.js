const { TWITCH_EVENTS } = require('../twitch.events');
const { sendMessage } = require('../utils');

const { SH_SO_SUPPORTED_STREAMERS } = process.env;

const streamers = (SH_SO_SUPPORTED_STREAMERS || "")
  .split(',')
  .reduce((prev, current, index) => {
    prev[current] = false;
    return prev;
  }, {});

exports.default = {
  event: TWITCH_EVENTS.JOIN,
  command: 'sh-so-handler',
  handler: async (client, channel, username) => {
    const supportedStreamer = !!streamers[username];
    if (supportedStreamer) {
      if (!streamers[username])
        sendMessage(channel, client, `Opa! ${username} na área, já conhece o canal?`);
        sendMessage(channel, client, `!sh-so @${username}`);
        streamers[username] = true;
    } else { 
      console.log(`${username} joined the streaming chat.`);
    }
  }
}