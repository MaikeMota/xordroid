const socialHandlers = [
];
// TODO: Read from a config file/database
if (process.env.SOCIAL) {
  socialHandlers.push({
    command: 'social',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.SOCIAL);
    },
  });
}
if (process.env.WEB_SITE) {
  socialHandlers.push({
    command: 'eu',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.WEB_SITE);
    }
  });
}
if (process.env.YOUTUBE) {
  socialHandlers.push({
    command: 'youtube',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.YOUTUBE);
    }
  });
}
if (process.env.INSTAGRAM) {
  socialHandlers.push({
    command: 'instagram',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.INSTAGRAM);
    }
  });
  socialHandlers.push({
    command: 'insta',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.INSTAGRAM);
    }
  });
}
if (process.env.GITHUB) {
  socialHandlers.push({
    command: 'github',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.GITHUB);
    }
  });
}

if (process.env.LOJINHA) {
  socialHandlers.push({
    command: 'lojinha',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.LOJINHA);
    }
  });
}

if (process.env.DISCORD) {
  socialHandlers.push({
    command: 'discord',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.DISCORD);
    }
  });
}

if (process.env.IOT_STREAMERS) {
  socialHandlers.push({
    command: 'iotstreamers',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.IOT_STREAMERS);
    }
  });
}

if (process.env.JULIA_LABS) {
  socialHandlers.push({
    command: 'julialabs',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.JULIA_LABS);
    }
  });
}
if (process.env.PIX) {
  socialHandlers.push({
    command: 'pix',
    handler: (client, channel, requestor, args) => {
      client.say(channel, process.env.PIX);
    }
  });
}
exports.default = socialHandlers;