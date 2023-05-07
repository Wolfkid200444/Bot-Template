module.exports = class Interaction {
    constructor (client, name, options = {}) {
        this.name = name;
        this.client = client;
        this.type = options.type || 1;
        this.description = this.type === 1 ? options.description || 'No description provided.' : undefined;
        this.options = options.options || [];
    }

    async run(interaction) {
        throw new Error(`Interaction ${this.name} doesn't provide a run method!`);
    }
}