const { readdirSync } = require('fs');
const dotenv = require('dotenv');
const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();
const tmi = require('tmi.js');
const MQTT = require("mqtt");
const { Console } = require('console');

dotenv.config();

const TWITCH_BOT_USERNAME = process.env.BOT_USERNAME;
const TWITCH_OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const TWITCH_CHANNEL_NAME = process.env.CHANNEL_NAME.split(',');
const MQTT_HOST = process.env.MQTT_HOST;
const MQTT_CLIENT = process.env.MQTT_CLIENT;
const MQTT_USER = process.env.MQTT_USER;
const MQTT_PW = process.env.MQTT_PW;

const mqtt_options = {
	host: MQTT_HOST,
	clientId: MQTT_CLIENT,
	username: MQTT_USER,
	password: MQTT_PW
};

var porta;
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
	options: { debug: true },
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

function parse_commands(raw_commands, username) {
	if(raw_commands[0] === "!comandos") {
		client.say(client.channels[0], '!led help | !eu | !camera help | !matrix <mensagem>');
	}
}

client.on("join", (channel, username, self) => {
  if(self) {
    client.say(channel,"Olá pessoas, eu sou o XORDroid, manda um !comandos ai no chat e veja minhas funcionalidades ;D");
	}
});

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	const commands = ["!led", "!mqtt", "!comandos", "!social", "!eu", "!camera", "!tela", "!proto", "!webcam", "!youtube", "!instagram", "!github", "!teste", "!matrix"];
	message_parse = message.split(" "); // split message
	if(commands.includes(message_parse[0])) { // has commands on message
		parse_commands(message_parse, tags.username);
		return;
	}
});

client.connect();

readdirSync(`${__dirname}/commands`)
  .filter((file) => file.slice(-3) === '.js')
  .forEach((file) => {
		require(`./commands/${file}`).default(client, obs, mqtt);
	});