module.exports = {
    isCommand(possibleCommand) {
        return possibleCommand.startsWith(process.env.COMMAND_PREFIX || `!`);
    },
    async sendMessage(channel, client, ...messages) {
        if (messages) {
            messages.forEach(async message => {
                await client.say(
                    channel,
                    message
                );
            })
        }
    },
    async sendWhisperMessage(client, username, ...messages) { 
        if(messages) { 
            messages.forEach(async message => { 
                // TODO: Handle messages greater than 500 caracteres!
                await client.whisper(username, message);
            });
        }
    }
}