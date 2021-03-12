exports.default = (client, obs, mqtt, messages) => {
  client.on('message', (target, context, message, isBot) => {
    if (isBot) return;

    let proxima_data = "13/03/2021 - próximo sabado!"

    switch (message) {
        case '!cafemaker':
        case '!cafe':
            client.say(
                target,
                `O Próximo Café Maker será dia ${proxima_data} as 10:00 am - Playlist no youtube  https://bit.ly/ytcafemaker`,
            );
            break;
        default:
            break;
    }
  });
};

