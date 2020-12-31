const Plugin = require('../base/Essentials');

module.exports = class fileCheck extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        setTimeout(() => {
            this.buildDB().then(res => {
                let db = res;
                db.run(`CREATE TABLE IF NOT EXISTS users(name TEXT, xuid INT, prefix TEXT, suffix TEXT, balance INT)`, (err) => {
                    if (err) return this.getApi().getLogger().error(err)
                });
            });
            this.buildConfig();
        },1000)
    }
};