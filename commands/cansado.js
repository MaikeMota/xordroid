const { get } = require('request-promise');
const translate = require('translate');
const { sendMessage, sendWhisperMessage } = require('../utils');

const { TRANSLATE_ENGINE, TRANSLATE_ENGINE_KEY } = process.env;

const boredAPIURL = "https://www.boredapi.com/api/activity"

//const translated_color = await translate(cp, { from: 'pt', to: 'en' });

exports.default = [
    {
        command: 'dica',
        handler: sendActivityRecomendation
    },
    {
        command: 'tocansado',
        handler: sendActivityRecomendation
    }
];

async function sendActivityRecomendation(client, channel, requestor, args) {

    translate.engine = TRANSLATE_ENGINE;
    translate.key = TRANSLATE_ENGINE_KEY;

    response = await get(boredAPIURL);
    response = JSON.parse(response);
    const translated = await translate(response.activity, { from: 'en', to: 'pt' });

    await sendWhisperMessage(
        client,
        requestor,
        `Segue a dica! ${translated} (${response.activity})`
    );

    
}
