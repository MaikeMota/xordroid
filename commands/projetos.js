const { sendWhisperMessage } = require('../utils');

exports.default = [
  {
    command: 'projects',
    handler: projectHandler
  },
  {
    command: 'projetos',
    handler: projectHandler
  },
  {
    command: 'ledmatrix',
    handler: (client, channel, requestor, args) => {
      client.say(channel, "Quer ver como foi implementado nossa Matrix de Led? veja o código aqui https://github.com/kadu/LedMatrixHomieIOT");
    }
  },
  {
    command: 'pcb_natal',
    handler: (client, channel, requestor, args) => {
      client.say(channel, "O @kaduzius participou de um concurso bem bacana de PCBs artisticas, veja aqui o resultado https://github.com/kadu/christmas_badge_2020");
    }
  },
  {
    command: 'xordroid',
    handler: (client, channel, requestor, args) => {
      client.say(channel, "Quer me ver por dentro né... veja lá => https://github.com/kadu/xordroid");
    }
  },
  {
    command: 'streamdeckble',
    handler: streamDeckHandler
  },
  {
    command: 'streamdeck',
    handler: streamDeckHandler
  },
  {
    command: 'porteiro',
    handler: porteiroIoTHandler
  },
  {
    command: 'porteiroiot',
    handler: porteiroIoTHandler
  },
  {
    command: 'gatekeeperiot',
    handler: porteiroIoTHandler
  },
  {
    command: 'gatekeeper',
    handler: porteiroIoTHandler
  },
  {
    command: 'cnc',
    handler: cncHandler
  },
  {
    command: 'donate',
    handler: cncHandler
  }
]

async function projectHandler(client, channel, requestor, args) {
  await sendWhisperMessage(
    client,
    requestor,
    `Veja a lista de projetos: ->
    !xordroid (eu mesmo, o bot),
    !streamdeck (hello world dos makers na twitch.tv),
    !gatekeeper (o porteiro)
    !pcb_natal (Enfeite de arvore de natal)
    !ledmatrix (Relógio que mostra mensagens)
    !tts - !pttts e !entts (Mandeiras de fazer o google falar com o streamer)
    !ytcount (Mostra qtde de pessoas inscritas no canal do youtube)
    !piada - !joke (Contador de piadas)
    !dica - !tocansado (Dicas do que fazer nos momentos "boring" da vida)
    `);
};

async function streamDeckHandler(client, channel, requestor, args) {
  await sendWhisperMessage(client, requestor, `Nosso StreamDeck ficou bem massa, da uma olhada aqui ó https://github.com/kadu/arduino_stream_deck`);
};

async function porteiroIoTHandler(client, channel, requestor, args) {
  await sendWhisperMessage(client, requestor, `Meu amigo porteiro você encontra aqui -> https://github.com/kadu/GateKeeperIOT`);
}
async function cncHandler(client, channel, requestor, args) {
  await sendWhisperMessage(client, requestor, `Você pode me ajudar a ter uma "super" cnc para fazer plaquinhas em casa, só mandar um "salve" via picpay pra @kadubr, se conseguirmos a maquineta, faremos lives e videos para o canal (aqui e na vermelhinha) mostrando como usar pra fazer as plaquinhas ;) - Valeu Grandão! (link da cnc: https://bit.ly/cncDU), se preferir, pode usar o PIX -> !pix pra pegar o QRCode `);
}