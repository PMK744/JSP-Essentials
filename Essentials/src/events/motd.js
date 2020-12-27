const Plugin = require('../base/BasePlugin');

module.exports = class dynamicMotd extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        let checkConfig = setInterval(() => {
            if (this.dynamicMotd == undefined || this.raknet == undefined) {} else {
                let motdCount = this.dynamicMotd.list.length;
                let motdInv = this.dynamicMotd.interval;
                let motds = this.dynamicMotd.list;
                let currentMotd = 0;
                this.api.getLogger().info(`§aSuccessfully loaded §9${motdCount}§a dynamicMotd messages, and each message will change every §9${motdInv}§a seconds!§r`);
                clearInterval(checkConfig);
                this.setMotd(motds[currentMotd]);
                let startMotd = setInterval(() => {
                    if (!motds[0]) return
                    if (motds.length === currentMotd) currentMotd = 0
                    this.setMotd(motds[currentMotd])
                    currentMotd++
                }, 1000 * motdInv);
            }
        })
    }
};