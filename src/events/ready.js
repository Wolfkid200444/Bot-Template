const Event = require('../structures/event');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true,
        })
    }

    async run(client, message, args) {
        console.log(`Logged in as ${client.user.tag}!`);
        this.client.user.setActivity('!help', { type: 'LISTENING' });
    }

}