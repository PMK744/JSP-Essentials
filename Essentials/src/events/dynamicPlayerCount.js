const Plugin = require('../base/Essentials');

module.exports = class dynamicPlayerCount extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        const moduleName = "[§5dynamicPlayerCount§r]"
        let checkConfig = setInterval(() => {
            if (this.dynamicPlayerCount == undefined || this.raknet == undefined) {} else {
                clearInterval(checkConfig);
                if (this.dynamicPlayerCount.enabled != true) return;
                this.api.getLogger().info(moduleName + " §aSuccessfully loaded dynamicPlayerCount!§r");
                let startCount = setInterval(() => {
                    let playerCount = this.raknet.getName().getOnlinePlayerCount()
                    if (playerCount <= this.dynamicPlayerCount.maxPlayers) this.raknet.getName().setMaxPlayerCount(playerCount + 1)
                },1000)
            }
        })
    }
};