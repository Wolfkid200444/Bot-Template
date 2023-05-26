
interface BotClient extends Bot.Client { 
	[ key: string ]: unknown;
}

enum EventTypes {
	ONCE = "once",
	ON = "on",
}
export default class Event {
	client?: BotClient;
	name: string;
	type?: EventTypes;
	emitter: Bot.Client | string;
	
	
	constructor(client: BotClient, name: string, options: { once?: boolean, emitter?: string } = {}) {
		this.name = name;
		this.client = client;
		this.type = options.once ? EventTypes.ONCE : EventTypes.ON ?? EventTypes.ON;
		this.emitter =
            options.emitter && (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
	}
	// eslint-disable-next-line no-unused-vars
	async run(...args: unknown[]) {
		throw new Error(`The run method has not been implemented in ${this.name}`);
	}
}
