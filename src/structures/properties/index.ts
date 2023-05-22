const { TextChannel } = require("discord.js");

const originalSend = TextChannel.prototype.send;

TextChannel.prototype.send = function (...arg) {
  const send = originalSend.bind(this);

  if (!this.permissionsFor(this.client.user).has("SEND_MESSAGES")) return;
  if (!this.permissionsFor(this.client.user).has("EMBED_LINKS")) {
    return send(...arg);
  }

  try {
    return send(...arg);
  } catch (err) {
    console.log(err);
  }
};

export default Object.defineProperties(TextChannel.prototype, {
  
});
