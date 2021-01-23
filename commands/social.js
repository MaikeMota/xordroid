const socialHandlers = [
];


if (process.env.SOCIAL) {
  socialHandlers.push({
    command: 'social',
    handler: (channel, client, args, obs, mqtt) => {
      client.say(channel, process.env.SOCIAL);
    },
  });
}
if (process.env.WEB_SITE) {
  socialHandlers.push({
    command: 'eu',
    handler: (channel, client, args, obs, mqtt) => {
      client.say(channel, process.env.WEB_SITE);
    }
  });
}
if (process.env.YOUTUBE) {
  socialHandlers.push({
    command: 'youtube',
    handler: (channel, client, args, obs, mqtt) => {
      client.say(channel, process.env.YOUTUBE);
    }
  });
}
if (process.env.INSTAGRAM) {
  socialHandlers.push({
    command: 'instagram',
    handler: (channel, client, args, obs, mqtt) => {
      client.say(channel, process.env.INSTAGRAM);
    }
  });
}
if (process.env.GITHUB) {
  socialHandlers.push({
    command: 'github',
    handler: (channel, client, args, obs, mqtt) => {
      client.say(channel, process.env.GITHUB);
    }
  });
}

exports.default = socialHandlers;
