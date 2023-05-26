import { Client, GatewayIntentBits, Collection } from 'discord.js';
import util from './utils.ts';

export default class BotClient extends Client {
	util: util;
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
		this.validate(options as Bot.Configuration);
		this.interactions = new Collection();
		this.commands = new Collection();
		this.events = new Collection();
		this.util = new util(this);
	}

	validate(options: Bot.Configuration) {
		if (!options.TOKEN) throw new Error('You must pass the token for the client to work.');
		this.token = options.TOKEN;
	}

	async start() {
		await this.util.loadEvents();
		await this.util.loadInteractions();
		return super.login();
	}
}