require('dotenv').config();

const { TWITCH_BOT_USERNAME, TWITCH_OAUTH_TOKEN } = process.env;
const TWITCH_CHANNEL_NAME = process.env.TWITCH_CHANNEL_NAME.split(',');

const { COMMAND_PREFIX, COMMAND_FOLDER_PATH } = process.env;
const { MQTT_HOST, MQTT_CLIENT, MQTT_USER, MQTT_PW } = process.env;

const { readdirSync } = require('fs');
const { join, extname } = require('path');
const util = require('util');

const tmi = require('tmi.js');
const MQTT = require("mqtt");

const mongoose = require('mongoose');

// mongoose.connect('mongodb://xordroid_points:TbfUhRuxEvqvA3j4@localhost:27018/admin', { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
// 	console.log("Papai ta ON");
// });

const botSchema = new mongoose.Schema({
	userid: String,
	points: Number
});

const { TWITCH_EVENTS } = require('./twitch.events');

// const botDB = mongoose.model('BOT', botSchema);

// const silence = new botDB({ userid: 'Silence 17', points: 10 });
// console.log("******************");
// console.log(silence.userid); // 'Silence'
// console.log("******************");
// silence.save();

const { sendWhisperMessage, isCommand } = require('./utils');

const mqtt_options = {
	host: MQTT_HOST,
	clientId: MQTT_CLIENT,
	username: MQTT_USER,
	password: MQTT_PW
};

const commandHandlers = {
};

const joinHandlers = {}

function validateAndRegisterHandler(requiredHandlerFile, file) {

	const { event, command, handler } = requiredHandlerFile;

	switch (event) {
		case TWITCH_EVENTS.MESSAGE:
		case undefined: {
			if (command && handler) {
				commandHandlers[command] = handler;
				console.info(`[MESSAGE]'${COMMAND_PREFIX}${command}' handler loaded!`);
			} else {
				console.warn(`[${file}] <--- Arquivo não contem um command handler válido.`);
			}
			break;
		}
		case TWITCH_EVENTS.JOIN: {
			if (handler) {
				joinHandlers[command] = handler;
				console.info(`'[JOIN]${command}' handler loaded!`);
			} else {
				console.warn(`[${file}] <--- Arquivo não contem um join handler válido.`);
			}
		}
	}
}

// const WELCOME_MESSAGE = "Olá pessoas, eu sou o XORDroid, manda um !comandos ai no chat e veja minhas funcionalidades ;D";
const WELCOME_MESSAGE = 'ON!';
const handleJoinEvent = async (channel, username, self) => {
	if (self) {
		client.say(channel, WELCOME_MESSAGE);
	} else {
		for (const key of Object.keys(joinHandlers)) {
			try {
				await joinHandlers[key](client, channel, username);
			}catch( e) { 
				console.error(`Ocorreu um erro ao tentar executar o joinHandler [${key}]`)
			}
		}
	}
};

const handleMessageEvent = async (channel, tags, message, self) => {
	if (self)
		return;
	const requestor = tags.username;
	let [command, ...args] = message.split(" "); // split message
	if (isCommand(command)) {
		command = command.replace(COMMAND_PREFIX, '');
		const commandHandler = commandHandlers[command];
		if (commandHandler) {
			try {
				await commandHandler(client, channel, requestor, args);
			} catch (e) {
				console.error(`An error was throwed by ${COMMAND_PREFIX}${command}:`, e);
			}
		} else {
			console.warn(`Command sent by ${requestor} was not found: ${COMMAND_PREFIX}${command}${args ? args.join(',') : ''}`);
		}
	}
};

var porta;
var messages = [];
var commandQueue = [];

var timerIsOn = true;
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
	options: {
		debug: process.env.NODE_ENV !== 'production',
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

mqtt.subscribe('homie/ledmatrix/message/state', function (err) {
});

mqtt.on('message', function (topic, message) {
	if (topic.toString() == 'homie/ledmatrix/message/state') {
		var isTrueSet = (message == 'Idle');
		timerIsOn = isTrueSet;
	}
});

setInterval(() => {
	if (timerIsOn) {
		if (messages.length > 0) {
			let message = messages.shift();
			mqtt.publish("homie/ledmatrix/message/message/set", message);
		}
	}
}, 1500);

const commandFolder = join(__dirname, COMMAND_FOLDER_PATH || '/commands');
console.info(`Loading commands from folder ${commandFolder}`);

readdirSync(commandFolder)
	.filter((file) => extname(file) === '.js')
	.forEach((file) => {
		const filePath = `${commandFolder}/${file}`;
		const requiredCommandFile = require(filePath).default;
		if (requiredCommandFile instanceof Array) {
			requiredCommandFile.forEach(rcf => validateAndRegisterHandler(rcf, filePath));
		} else {
			validateAndRegisterHandler(requiredCommandFile, filePath);
		}
	});

commandHandlers['ajuda'] = commandHandlers['help'] = async (client, channel, requestor, args) => {
	await sendWhisperMessage(client, requestor, `Comandos disponíveis:`,
		Object.keys(commandHandlers)
			.map(command => `${COMMAND_PREFIX}${command}`)
	);
}

// function parse_commands(raw_commands, username) {
// 	if (raw_commands[0] === "!comandos") {
// 		client.say(client.channels[0], '!led help | !eu | !camera help | !matrix <mensagem>');
// 	}
// }

client.on("join", async (channel, username, self) => await handleJoinEvent(channel, username, self));
client.on('message', async (channel, tags, message, self) => await handleMessageEvent(channel, tags, message, self));

client.connect();

// if (raw_commands[0] === "!comandos" || raw_commands[0] === "!help" | raw_commands[0] === "!ajuda") {
// 	client.say(client.channels[0], '!led help | !eu | !camera help | !matrix <mensagem> | !donate | !github | !dica | !projetos | tem  mais mas você terá que descobrir :P');
// }



// client.on("join", (channel, username, self) => {
// 	if (self) {
// 		// client.say(channel,"Olá pessoas, eu sou o XORDroid, manda um !comandos ai no chat e veja minhas funcionalidades ;D ... e !projetos pra ver o que já fizemos");
// 		client.say(channel, "To on!");
// 	}
// });

// client.on('message', (channel, tags, message, self) => {
// 	if (self) return;
// 	const commands = [
// 		"!led"
// 		, "!mqtt"
// 		, "!comandos"
// 		, "!social"
// 		, "!eu"
// 		, "!camera"
// 		, "!tela"
// 		, "!proto"
// 		, "!webcam"
// 		, "!youtube"
// 		, "!instagram"
// 		, "!github"
// 		, "!teste"
// 		, "!matrix"
// 		, "!donate"
// 		, "!xordroid"
// 		, "!streamdeckble"
// 		, "!streamdeck"
// 		, "!gatekeeperiot"
// 		, "!gatekeeper"
// 		, "!projetos"
// 		, "!projects"
// 		, "!ajuda"
// 		, "!help"
// 	];
// 	message_parse = message.split(" "); // split message
// 	// verificar se só o primeiro é o comando
// 	if (commands.includes(message_parse[0])) { // has commands on message
// 		parse_commands(message_parse, tags.username);
// 		return;
// 	}
// });

// client.connect();

