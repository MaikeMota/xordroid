exports.default = {
  command: 'matrix',
  handler: async (channel, client, args) => {
    // TODO get MQTT
    let fullMessage = args.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    mqtt.publish("xordroid/message", fullMessage);
  }
}
