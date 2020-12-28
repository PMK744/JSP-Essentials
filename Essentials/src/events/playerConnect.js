const Plugin = require('../base/BasePlugin');

module.exports = class onChat extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        const server = this.getApi().getServer();

        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                if (this.config.chatFormat.enabled != true) return;
                clearInterval(checkConfig);
                this.api.getLogger().info(`[§5chatFormat§r] §aSuccessfully loaded chatFormat settings!§r`);
                server.getEventManager().on('playerSpawn', async event => {
                    let target = event.player;
                    let newPlayer = await this.checkUser(target);
                    if (newPlayer == true) {
                        await this.setPrefix(target);
                        await this.setSuffix(target);
                    } else {
                        let prefix = await this.getPrefix(target);
                        let suffix = await this.getSuffix(target);
                        await this.setPrefix(target, prefix)
                        await this.setSuffix(target, suffix)
                    }
                });
            }
        });
    }
};