const Plugin = require('../base/Essentials');

module.exports = class onChat extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        const server = this.getApi().getServer();
        const moduleName = "[§5webChat§r]"

        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.config.webChat.enabled != true) return;
                if (this.config.webChat.url == "") return this.api.getLogger().info(moduleName + ' §cYou must include a webhook url for webChat to activate.§r');
                this.api.getLogger().info(moduleName + ' §aSuccessfully loaded webChat settings!§r');
                server.getEventManager().on('chat', event => {
                    if(!event.chat.sender.isPlayer()) return;
                    const player = event.chat.sender.username.name;
                    const message = event.chat.message.replace(`${event.chat.sender.username.prefix}${event.chat.sender.username.name}${event.chat.sender.username.suffix} `, "")
                    this.emitMessage(player, message)
                });
            }
        });
    }
};