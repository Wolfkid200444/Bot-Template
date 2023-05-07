const Event = require('../structures/event');

module.exports = class extends Event {

    async run(interaction) {

        if(interaction.isChatInputCommand()) return this.client.emit('slashCommands', interaction);
    }
}