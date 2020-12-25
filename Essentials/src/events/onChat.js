const Plugin = require('../base/BasePlugin');

module.exports = class onChat extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        const server = this.getApi().getServer();

        server.getEventManager().on('chat', event => {

            //Returns if sender is not a player
            if(!event.chat.sender.isPlayer()) return;
            
            //console.log(event.chat.sender)


            const player = event.chat.sender.username.name;
            const message = event.chat.message.replace(`${event.chat.sender.username.prefix}${event.chat.sender.username.name}${event.chat.sender.username.suffix} `, "")
            
            //event.chat.sender.username.prefix = '[Test]';

            console.log(`${player} => ${message}`);

        });
    }
};