const sound = require("sound-play");

const util = require('util');
const fs = require('fs');
const path = require('path');

const textToSpeech = require('@google-cloud/text-to-speech');
const clientTTS = new textToSpeech.TextToSpeechClient();

const queueTTS = (username, message, lang) => {
  let fullMessage = `${username} ${lang == 'en' ? 'said' : 'disse'}: ${message}`;
  ttsQueue.push({ 'msg': fullMessage, 'lang': lang, 'inputType': 'text' });
};

exports.default = [
  {
    command: 'tts',
    handler: (client, channel, requestor, args) => {
      queueTTS(requestor, args.join(' '), 'pt-BR');
    },
  },
  {
    command: 'entts',
    handler: (client, channel, requestor, args) => {
      if (!this.client) { // TODO get client instance in a better way
        this.client = client;
      }
      queueTTS(requestor, args.join(' '), 'en');
    },
  },
  {
    command: 'pttts',
    handler: (client, channel, requestor, args) => {
      if (!this.client) { // TODO get client instance in a better way
        this.client = client;
      }
      queueTTS(requestor, args.join(' '), 'pt-PT');
    },
  }
]

const ttsQueue = [];
let isPlayingTTS = false;

const ttsInterval = setInterval(async () => {
  if (!isPlayingTTS && ttsQueue.length > 0) {
    let tts = ttsQueue.shift();
    await playTTS(tts);
  }
}, 500);

async function playTTS(message) {
  isPlayingTTS = true;
  const text = message.msg;
  const inputType = message.inputType;

  const request = {
    input: { [inputType]: text },
    voice: { languageCode: message.lang, ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'LINEAR16' },
  };

  const [response] = await clientTTS.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);

  try {
    const ttsTempFile = path.resolve('output.m4a');
    await writeFile(ttsTempFile, response.audioContent);
    await sound.play(ttsTempFile, 1);
    console.log("done");
  } catch (error) {
    console.error('Error whiling reproducing TTS sound file', error);
  } finally {
    isPlayingTTS = false;
  }

};
