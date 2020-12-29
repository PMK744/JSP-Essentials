const Plugin = require('../base/BasePlugin');

module.exports = class fileCheck extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        setTimeout(() => {
            this.buildDB().then(res => {
                let db = res;
                db.run(`CREATE TABLE IF NOT EXISTS users(name TEXT, xuid INT, prefix TEXT, suffix TEXT)`, (err) => {
                    if (err) return this.getApi().getLogger().error(err)
                });
            });
            this.buildConfig();
        },1000)
    }
};