module.exports = {
    isCommand(possibleCommand) {
        return possibleCommand.startsWith(process.env.COMMAND_PREFIX);
    },
    async sendMessage(channel, client, message) {
        await client.say(
            channel,
            message
        );
    }
}