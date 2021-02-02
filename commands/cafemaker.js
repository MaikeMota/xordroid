const { CAFE_MAKER_NEXT_DATE } = process.env;

exports.default = [
  {
    command: 'cafemaker',
    handler: sendCafeMakerSchedule
  },
  {
    command: 'cafe',
    handler: sendCafeMakerSchedule
  }
]

function sendCafeMakerSchedule(client, channel, requestor, args) {
  client.say(
    channel,
    `O Próximo Café Maker será dia ${CAFE_MAKER_NEXT_DATE} as 10:00 am - Playlist no youtube  https://bit.ly/ytcafemaker`
  );
}

