interface InteractionOptions {
	name: string;
	description: string;
	type: number;
	required?: boolean;
	choices?: [
		{
			name: string;
			value: string;
		}
	];
}

enum InteractionType {
	SUB_COMMAND = 1,
	SUB_COMMAND_GROUP = 2,
	STRING = 3,
	INTEGER = 4,
	BOOLEAN = 5,
	USER = 6,
	CHANNEL = 7,
	ROLE = 8,
  }

export default class Interaction {
	name: string;
	client?: Bot.Client;
	type: InteractionType;
	description: string;
	options: InteractionOptions[];

	constructor(client: Bot.Client, name: string, options: { type?: InteractionType, description?: string, options?: InteractionOptions[] } = {}) {
		this.client = client;
		this.name = name;
		this.type = options.type ?? 1;
		this.description = this.type === 1 ? options.description ?? 'No description provided.' : '';
		this.options = options.options ?? [];
	}

	// eslint-disable-next-line no-unused-vars
	async run(...interaction: unknown[]) {
		throw new Error(`Interaction ${this.name} doesn't provide a run method!`);
	}
}
