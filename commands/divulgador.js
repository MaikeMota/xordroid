const { sendMessage } = require('../utils');

exports.default = [
  {
    command: 'jpbrab0',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        `Papai, é você? twitch.tv/jpbrab0`,
      );
    }
  },
  {
    command: 'caraio',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pachicodes'),
      );
    }
  },
  {
    command: 'captura',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pokemaobr'),
      );
    }
  },
  {
    command: 'selvagem',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pokemaobr'),
      );
    }
  },
  {
    command: 'capturar',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        getLiveErradaKappaMessage('pokemaobr'),
      );
    }
  },
  {
    command: 'participar',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        'Eu ouvi falar C# ? cola lá na live do @daniel_dev',
      );
    }
  },
  {
    command: 'meme',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        'Eu ouvi falar C# ? cola lá na live do @daniel_dev',
      );
    }
  }, ,
  {
    command: 'party',
    handler: async (client, channel, requestor, args) => {
      await sendMessage(
        channel,
        client,
        'A festa é com o @webmat1, não é aqui não',
      );
    }
  },
];

function getLiveErradaKappaMessage(targetChannel) {
  return `Acho que cê ta na live errada Kappa. A certa é essa aqui: twitch.tv/${targetChannel}`;
}
