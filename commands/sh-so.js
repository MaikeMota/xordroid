const { TWITCH_EVENTS } = require('../twitch.events');
const { sendMessage } = require('../utils');

const { SH_SO_SUPPORTED_STREAMERS } = process.env;

const streamers = (SH_SO_SUPPORTED_STREAMERS || "")
  .split(',')
  .reduce((prev, current) => {
    prev[current.toLocaleLowerCase()] = false;
    return prev;
  }, {});

exports.default = {
  event: TWITCH_EVENTS.JOIN,
  command: 'sh-so-handler',
  handler: async (client, channel, username) => {
    username = username.toLowerCase();
    const supportedStreamer = !!streamers[username];
    if (supportedStreamer) {
      if (!streamers[username])
        console.log(`[sh-so-handler] Supported Streamer ${username} joined the streaming chat.`);
        sendMessage(channel, client, `Opa! ${username} na área, já conhece o canal?`);
        sendMessage(channel, client, `!sh-so @${username}`);
        streamers[username] = true;
    } else { 
      console.log(`[sh-so-handler] ${username} joined the streaming chat.`);
    }
  }
}