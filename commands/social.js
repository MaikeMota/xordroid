const socialHandlers = [
];
exports.default = (client, channel, requestor, args) => {


  if (process.env.SOCIAL) {
    socialHandlers.push({
      command: 'social',
      handler: (client, channel, requestor, args, obs, mqtt) => {
        client.say(channel, process.env.SOCIAL);
      },
    });
  }
  if (process.env.WEB_SITE) {
    socialHandlers.push({
      command: 'eu',
      handler: (client, channel, requestor, args, obs, mqtt) => {
        client.say(channel, process.env.WEB_SITE);
      }
    });
  }
  if (process.env.YOUTUBE) {
    socialHandlers.push({
      command: 'youtube',
      handler: (client, channel, requestor, args, obs, mqtt) => {
        client.say(channel, process.env.YOUTUBE);
      }
    });
  }
  if (process.env.INSTAGRAM) {
    socialHandlers.push({
      command: 'instagram',
      handler: (client, channel, requestor, args, obs, mqtt) => {
        client.say(channel, process.env.INSTAGRAM);
      }
    });
  }
  if (process.env.GITHUB) {
    socialHandlers.push({
      command: 'github',
      handler: (client, channel, requestor, args, obs, mqtt) => {
        client.say(channel, process.env.GITHUB);
      }
    });
  }
};

  exports.default = socialHandlers;

  


  // case '!youtube':
  //       client.say(target, 'https://bit.ly/canaldokadu');
  //       break;

  //     case '!insta':
  //     case '!instagram':
  //       client.say(target, 'https://www.instagram.com/canaldokadu/');
  //       break;

  //     case '!github':
  //       client.say(target, 'https://github.com/kadu/');
  //       break;

  //     case '!lojinha':
  //       client.say(target, 'http://kaduzi.us/lojinha');
  //       break;

  //     case '!discord':
  //       client.say(target, 'https://discord.gg/wmmTKHeHDJ');
  //       break;

  //     case '!iotstreamers':
  //       client.say(target, 'https://discord.gg/Gk5e5Cx');
  //       break;

  //     case '!julialabs':
  //       client.say(target, 'Discord -> https://discord.gg/qdfaNcPv | Twitch.tv -> https://www.twitch.tv/julialabs | Youtube -> https://www.youtube.com/channel/UChfu9xWITOvsXYLKm7hieSQ');
  //       break;

  //     case '!pix':
  //       client.say(target, 'Donate com PIX -> http://www.kaduzi.us/pix');
  //       break;

  //     default:
  //       break;
  //   }