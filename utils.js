module.exports = {
    isCommand(possibleCommand) {
        return possibleCommand.startsWith(process.env.COMMAND_PREFIX);
    },
    sendMessage(channel, client, message) {
        client.say(
            channel,
            message
        );
    }
}