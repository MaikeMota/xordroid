// const chalk  = require('chalk');
const logs = require('./commons/log');

exports.default = (client, obs, mqtt, messages, commandQueue, ttsQueue, send) => {
    client.on('message', (target, context, message, isBot) => {
        if (isBot) return;

        switch (message) {
            case '!comando':
                client.say(
                    target,
                    `só um teste... básico!`,
                );

                break;
            default:
                break;
        }
    });
};

