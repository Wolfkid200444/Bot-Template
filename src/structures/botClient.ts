import { Client, GatewayIntentBits, Collection } from 'discord.js';
import util from './utils.js';

export default class BotClient extends Client {
	util: util;
	prefix: string;
	token: string;
	events: Collection<string, any>;
	commands: Collection<string, any>;
	interactions: Collection<string, any>;

	constructor(options = {}) {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildEmojisAndStickers,
			],
		});
		this.interactions = new Collection();
		this.commands = new Collection();
		this.events = new Collection();
		this.validate(options);
		this.util = new util(this);
	}

	validate(options) {
		if (!options.token) throw new Error('You must pass the token for the client to work.');
		this.token = options.TOKEN;

		if (!options.prefix) throw new Error('You must pass the prefix for the client to work.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix must be a string.');
		this.prefix = options.PREFIX;
	}

	async start() {
		await this.util.loadEvents();
		await this.util.loadInteractions();
		return super.login();
	}
}