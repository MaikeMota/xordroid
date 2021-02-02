exports.default = {
    command: 'comando',
    handler: async (channel, client, args) => {
        await client.say(
            channel,
            `só um teste... básico!`,
        );
    }
}
