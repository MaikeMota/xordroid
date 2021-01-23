require('dotenv').config();

const { readdirSync } = require('fs');
const { join, extname } = require('path');

const tmi = require('tmi.js');
const MQTT = require("mqtt");

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
