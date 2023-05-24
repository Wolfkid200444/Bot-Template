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
export default class Interaction {
	client?: Client;
	name: string;
	type: Types.InteractionType;
	description: string;
	options: InteractionOptions[];

	constructor(client: Client, name: string, options: { type?: Types.InteractionType, description?: string, options?: InteractionOptions[] } = {}) {
		this.name = name;
		this.client = client;
		this.type = options.type ?? 1;
		this.description = this.type === 1 ? options.description ?? 'No description provided.' : '';
		this.options = options.options ?? [];
	}

	// eslint-disable-next-line no-unused-vars
	async run(interaction: unknown[]) {
		throw new Error(`Interaction ${this.name} doesn't provide a run method!`);
	}
}
