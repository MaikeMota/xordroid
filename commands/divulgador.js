const { sendMessage } = require('../utils');

exports.default = [
  {
    command: 'jpbrab0',
    handler: async (channel, client, args) => {
      await sendMessage(
        channel,
        client,
        `Papai, é você? twitch.tv/jpbrab0`,
      );
    }
  },
  {
    command: 'caraio',
    handler: async (channel, client, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pachicodes'),
      );
    }
  },
  {
    command: 'captura',
    handler: async (channel, client, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pokemaobr'),
      );
    }
  },
  {
    command: 'selvagem',
    handler: async (channel, client, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pokemaobr'),
      );
    }
  },
  {
    command: 'capturar',
    handler: async (channel, client, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pokemaobr'),
      );
    }
  },
];

function getLiveErradaKappaMessage(targetChannel) {
  return `Acho que cê ta na live errada Kappa. A certa é essa aqui: twitch.tv/${targetChannel}`;
}
