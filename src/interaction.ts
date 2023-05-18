export default class Interaction {
	client: Client;
	name: string;
	type: number;
	description: string;
	options: any[];

	constructor(client, name, options = {}) {
		this.name = name;
		this.client = client;
		this.type = options.type || 1;
		this.description = this.type === 1 ? options.description || 'No description provided.' : undefined;
		this.options = options.options || [];
	}

	// eslint-disable-next-line no-unused-vars
	async run(interaction) {
		throw new Error(`Interaction ${this.name} doesn't provide a run method!`);
	}
}