const request = require('request-promise');

const { sendMessage } = require('../utils');

const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID, YOUTUBE_OUTPUT_LOCAL } = process.env;
const url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + YOUTUBE_CHANNEL_ID + "&key=" + YOUTUBE_API_KEY;

const getCounter = async (channelUrl) => {
  let response = await request({
    method: 'GET',
    url: url
  });
  var json = JSON.parse(response);
  return (json.items[0].statistics.subscriberCount);
}

exports.default = {
  command: 'ytcount',
  handler: async (client, channel, requestor, args) => {
    const contador = await getCounter();
    // TODO escolher entre matriz de leds, canal ou ambos
    switch (YOUTUBE_OUTPUT_LOCAL) {
      case 'CHAT':
        await sendMessage(channel, client, `Valeu por chegar a ${contador} inscritos no youtube \\o/`);
        break;
      case 'MATRIX':
        // messages.push(`Valeu por chegar a ${contador} inscritos no youtube \\o/`);
        break;
      default:
        console.error(`${YOUTUBE_OUTPUT_LOCAL} is not a valid output for YT counter.`)

    }
  }
};

