require('dotenv').config();

const { readdirSync } = require('fs');
const { join, extname } = require('path');

const tmi = require('tmi.js');
const MQTT = require("mqtt");
const { Console } = require('console');
const mongoose = require('mongoose');
const sound = require("sound-play");
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');


const clienttts = new textToSpeech.TextToSpeechClient();
async function playTTS(message) {
  isPlayingTTS = true;
  const text = message.msg;
  const inputType = message.inputType;

  const request = {
    input: {[inputType]: text},
    voice: {languageCode: message.lang, ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'},
  };

  const [response] = await clienttts.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  sound.play(`${__dirname}\\output.mp3`).then((response) => {
    console.log("done");
    isPlayingTTS = false;
  }).catch((error) => {
    isPlayingTTS = false;
    console.error(error);
  });
}

mongoose.connect('mongodb://xordroid_points:TbfUhRuxEvqvA3j4@localhost:27018/admin', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Papai ta ON");
});

const botSchema = new mongoose.Schema({
  userid: String,
  points: Number
});

const botDB = mongoose.model('BOT', botSchema);

// const silence = new botDB({ userid: 'Silence 17', points: 10 });
// console.log("******************");
// console.log(silence.userid); // 'Silence'
// console.log("******************");
// silence.save();

const Utils = require('./utils');

const { TWITCH_BOT_USERNAME, TWITCH_OAUTH_TOKEN } = process.env;
const TWITCH_CHANNEL_NAME = process.env.TWITCH_CHANNEL_NAME.split(',');

const { COMMAND_PREFIX, COMMAND_FOLDER_PATH } = process.env;
const { MQTT_HOST, MQTT_CLIENT, MQTT_USER, MQTT_PW } = process.env;

const mqtt_options = {
	host: MQTT_HOST,
	clientId: MQTT_CLIENT,
	username: MQTT_USER,
	password: MQTT_PW
};

const commandHandlers = {
};

const validateAndRegisterCommand = (requiredCommandFile) => {
	const { command, handler } = requiredCommandFile;
	if (command && handler) {
		commandHandlers[command] = handler;
		console.log(`'${COMMAND_PREFIX}${command}' loaded!`);
	}
}

const WELCOME_MESSAGE = "Olá pessoas, eu sou o XORDroid, manda um !comandos ai no chat e veja minhas funcionalidades ;D";
const handleJoinEvent = (channel, username, self) => {
	if (self) {
		client.say(channel, WELCOME_MESSAGE);
	}
};

const handleMessageEvent = async (channel, tags, message, self) => {
	if (self)
		return;
	let [command, ...args] = message.split(" "); // split message
	if (Utils.isCommand(command)) {
		command = command.replace(COMMAND_PREFIX, '');
		const commandHandler = commandHandlers[command];
		if (commandHandler) {
			try {
				await commandHandler(channel, client, args);
			} catch (e) {
				console.error(`An error was throwed by ${COMMAND_PREFIX}${command}:`, e);
			}
		} else {
			console.log(`Command sent by ${tags.username} was not found: ${COMMAND_PREFIX}${command}${args ? args.join(',') : ''}`);
		}
	}
};

var porta;
var messages = [];
var commandQueue = [];
var ttsQueue = [];
var timerIsOn = true;
var isPlayingTTS = false;
const mqtt = MQTT.connect(mqtt_options);

mqtt.on('connect', function () {
	mqtt.subscribe('xordroid/weather/keepAlive', function (err) {
		if (!err) {
			mqtt.publish('xordroid/weather/keepAlive', 'Hello mqtt');
			console.log("MQTT Ready!");
			mqtt.publish("wled/158690/api", "FX=80&SN=1");
			mqtt.publish("wled/158690/col", "#7FFF00");
			mqtt.publish("wled/158690", "ON");
		}
	})
});

const client = new tmi.Client({
	options: { debug: process.env.NODE_ENV !== 'production' },
    }
  });

  mqtt.subscribe('homie/ledmatrix/message/state', function (err) {
  });

  mqtt.on('message', function (topic, message) {
    if(topic.toString() == 'homie/ledmatrix/message/state') {
      var isTrueSet = (message == 'Idle');
      timerIsOn = isTrueSet;
    }
  });

  setInterval(() => {
    if(timerIsOn) {
      if(messages.length > 0) {
            let message = messages.shift();
            mqtt.publish("homie/ledmatrix/message/message/set", message);
      }
    }
  }, 1500);

  setInterval(async () => {
    if((ttsQueue.length > 0) && (!isPlayingTTS)) {
      let tts = ttsQueue.shift();
      await playTTS(tts);
    }
  }, 2500);
});

const client = new tmi.Client({
  options: {
    debug: false,
    level: 'warn',
  },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: TWITCH_BOT_USERNAME,
		password: TWITCH_OAUTH_TOKEN
	},
  channels: TWITCH_CHANNEL_NAME
});

const commandFolder = join(__dirname, COMMAND_FOLDER_PATH || '/commands');
console.log(`Loading commands from folder ${commandFolder}`);

readdirSync(commandFolder)
	.filter((file) => extname(file) === '.js')
	.forEach((file) => {
		const requiredCommandFile = require(`./commands/${file}`).default;
		if (requiredCommandFile instanceof Array) {
			requiredCommandFile.forEach(validateAndRegisterCommand);
		} else {
			validateAndRegisterCommand(requiredCommandFile);
		}
	});

function parse_commands(raw_commands, username) {
	if (raw_commands[0] === "!comandos") {
		client.say(client.channels[0], '!led help | !eu | !camera help | !matrix <mensagem>');
	}
}

client.on("join", async (channel, tags, message, self) => await handleJoinEvent(channel, tags.username, self));
client.on('message', async (channel, tags, message, self) => await handleMessageEvent(channel, tags, message, self));
client.connect();
	if(raw_commands[0] === "!comandos"||raw_commands[0] === "!help"| raw_commands[0] === "!ajuda") {
		client.say(client.channels[0], '!led help | !eu | !camera help | !matrix <mensagem> | !donate | !github | !dica | !projetos | tem  mais mas você terá que descobrir :P');
	}
}



client.on("join", (channel, username, self) => {
  if(self) {
    // client.say(channel,"Olá pessoas, eu sou o XORDroid, manda um !comandos ai no chat e veja minhas funcionalidades ;D ... e !projetos pra ver o que já fizemos");
    client.say(channel, "To on!");
	}
});

client.on('message', (channel, tags, message, self) => {
  if(self) return;
  const commands = [
      "!led"
    , "!mqtt"
    , "!comandos"
    , "!social"
    , "!eu"
    , "!camera"
    , "!tela"
    , "!proto"
    , "!webcam"
    , "!youtube"
    , "!instagram"
    , "!github"
    , "!teste"
    , "!matrix"
    , "!donate"
    , "!xordroid"
    , "!streamdeckble"
    , "!streamdeck"
    , "!gatekeeperiot"
    , "!gatekeeper"
    , "!projetos"
    , "!projects"
    , "!ajuda"
    , "!help"
  ];
  message_parse = message.split(" "); // split message
  // verificar se só o primeiro é o comando
	if(commands.includes(message_parse[0])) { // has commands on message
		parse_commands(message_parse, tags.username);
		return;
	}
});

client.connect();

readdirSync(`${__dirname}/commands`)
  .filter((file) => file.slice(-3) === '.js')
  .forEach((file) => {
		require(`./commands/${file}`).default(client, obs, mqtt, messages, botDB, commandQueue, ttsQueue);
  });
