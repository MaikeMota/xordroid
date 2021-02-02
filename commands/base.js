exports.default = {
    command: 'comando',
    handler: async (client, channel, requestor, args) => {
        await client.say(
            channel,
            `só um teste... básico!`,
        );
    }
}
