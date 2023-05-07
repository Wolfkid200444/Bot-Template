const { Client, GatewayIntentBits } = require('discord.js')
const util = require('./utils');

class botClient extends Client {
    constructor(options = {}) {
        super({
            intents: [
                GatewayIntentBits.GUILDS,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildEmojisAndStickers,
            ]
        });
        this.validate(options);
        this.util = new util(this);
    }

    validate(options) {
        if (!options.token) throw new Error('You must pass the token for the client to work.');
        this.token = options.token;

        if (!options.prefix) throw new Error('You must pass the prefix for the client to work.');
        if (typeof options.prefix !== 'string') throw new TypeError('Prefix must be a string.');
        this.prefix = options.prefix;
    }

    async start() {
        return super.login();
    }
}

module.exports = botClient;