const getRaknet = require('../utils/getRaknet');
const checkUser = require('../utils/checkUser');
const getPrefix = require('../utils/name/getPrefix');
const setPrefix = require('../utils/name/setPrefix');
const getSuffix = require('../utils/name/getSuffix');
const setSuffix = require('../utils/name/setSuffix');
const emitMessage = require('../utils/webhook/emitMessage');
const setMotd = require('../utils/motd/setMotd');
const buildDB = require('../utils/database/build')
const attachDB = require ('../utils/database/attach');
const buildConfig = require('../utils/config/build');
const attachConfig = require ('../utils/config/attach');

module.exports = class BasePlugin {
    constructor(plugin, emitter) {
        this.plugin = plugin;
        this.api = plugin.api;
        this.emitter = emitter;
        setTimeout(async () => {
            this.server = await this.api.getServer();
            this.logger = await this.api.getLogger();
            await this.getRaknet().then(res => {
                this.raknet = res;
            })
            await this.attachDB().then(res => {
                this.db = res;
            })
            await setTimeout(() => {
                this.attachConfig().then(async res => {
                    this.config = res;
                    this.chatFormat = this.config.chatFormat;
                    this.dynamicMotd = this.config.dynamicMotd;
                })
            },500)
        },1000)
    }

    buildDB() {
        return buildDB(this.logger);
    }

    attachDB() {
        return attachDB(this.logger);
    }

    getDB() {
        return this.db;
    }

    getRaknet() {
        return getRaknet(this.server);
    }

    buildConfig() {
        return buildConfig(this.logger);
    }

    attachConfig() {
        return attachConfig(this.logger);
    }

    checkUser(target) {
        return checkUser(target);
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
        return setMotd(content, this.raknet);
    }

    emitMessage(sender, content) {
        return emitMessage(sender, content, this.config.webChat, this.logger)
    }

    getPlugin() {
        return this.plugin;
    }
    /**
     * Get Prismarine API
     * @returns {Prismarine_Api}
     */
    getApi() {
        return this.api;
    }
};