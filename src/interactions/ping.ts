import Interaction from '../interaction';

export default class Ping extends Interaction {
	constructor(...args) {
		super(...args, {
			name: 'ping',
			description: 'Ping!',
		});
	}

	async run(interaction) {
		await interaction.reply('Pong!');
	}
}
