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
];
exports.default = (client, target, context, messages) => {
  client.on('message', (target, context, message, isBot) => {
    if (isBot) return;

    switch (message) {
    case '!jpbrab0':
      client.say(
        target,
        `Papai, é você? @jpbrab0`,
      );
      break;
    case '!caraio':
      client.say(
        target,
        `Acho que cê ta na live errada Kappa. A certa é essa aqui: @pachicodes`,
      );
      break;
    case '!captura':
    case '!capturar':
    case '!selvagem':
      client.say(
        target,
        `Acho que cê ta na live errada Kappa. A certa é essa aqui: @pokemaobr`,
      );
      break;
      case '!participar':
      case '!meme':
        client.say(
          target,
          `Eu ouvi falar C# ? cola lá na live do @daniel_dev`,
        );
        break;
        case '!party':
          client.say(
            target,
            `A festa é com o @webmat1, não é aqui não`,
          );
          break;
    default:
      break;
      }
    });

function getLiveErradaKappaMessage(targetChannel) {
  return `Acho que cê ta na live errada Kappa. A certa é essa aqui: twitch.tv/${targetChannel}`;
}
