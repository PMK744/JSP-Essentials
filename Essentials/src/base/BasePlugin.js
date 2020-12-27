const checkUser = require('../utils/checkUser');
const getPrefix = require('../utils/name/getPrefix');
const setPrefix = require('../utils/name/setPrefix');
const getSuffix = require('../utils/name/getSuffix');
const setSuffix = require('../utils/name/setSuffix');
const setMotd = require('../utils/motd/setMotd');

module.exports = class BasePlugin {
    constructor(plugin, emitter) {
        this.plugin = plugin;
        this.api = plugin.api;
        this.emitter = emitter;
        setTimeout(() => {
            this.server = this.api.getServer()
            this.raknet = this.api.getServer().getRaknet()
        },1000)
        require("../functions/database/attach").initialize().then(res => {
            this.db = res;
            this.db.run(`CREATE TABLE IF NOT EXISTS users(name TEXT, xuid INT, prefix TEXT, suffix TEXT)`, (err) => {
                if (err) return this.api.getLogger().error(err)
            });
        });
        setTimeout(() => {
            require("../functions/config/attach").initialize().then(res => {
                this.config = res;
                this.chatFormat = this.config.chatFormat;
                this.dynamicMotd = this.config.dynamicMotd
            }).catch(err => {
                console.log(err)
            });
        }, 500)
    }

    getDB() {
        return this.db;
    }

    checkUser(target) {
        return checkUser(target)
    }

    getPrefix(target) {
        return getPrefix(target);
    }

    setPrefix(target, content) {
        return setPrefix(target, content, this.chatFormat);
    }

    getSuffix(target) {
        return getSuffix(target);
    }

    setSuffix(target, content) {
        return setSuffix(target, content, this.chatFormat);
    }

    setMotd(content) {
        return setMotd(content, this.server);
    }

    getPlugin() {
        return this.plugin;
    }

    getApi() {
        return this.api;
    }
};