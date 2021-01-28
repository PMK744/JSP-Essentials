const getRaknet = require('../utils/getRaknet');
const checkUser = require('../utils/checkUser');
const getPrefix = require('../utils/name/getPrefix');
const setPrefix = require('../utils/name/setPrefix');
const getSuffix = require('../utils/name/getSuffix');
const setSuffix = require('../utils/name/setSuffix');
const emitMessage = require('../utils/webhook/emitMessage');
const setMotd = require('../utils/motd/setMotd');
const getBalanceByName = require('../utils/economy/getBalanceByName');
const updateBalanceByName = require('../utils/economy/updateBalanceByName');
const updateBalanceByXuid = require('../utils/economy/updateBalanceByXuid');
const getBalanceByXuid = require('../utils/economy/getBalanceByXuid');
const buildDB = require('../utils/database/build');
const attachDB = require('../utils/database/attach');
const buildConfig = require('../utils/config/build');
const attachConfig = require('../utils/config/attach');
const addWarp = require('../utils/warps/addWarp');
const removeWarp = require('../utils/warps/removeWarp');
const getWarps = require('../utils/warps/getWarps');
const getHome = require('../utils/warps/home/getHome');
const setHome = require('../utils/warps/home/setHome');
const setPOS = require('../utils/setPOS');

module.exports = class Essentials {
    constructor(plugin, emitter) {
        this.plugin = plugin;
        this.api = plugin.api;
        this.emitter = emitter;
        setTimeout(async () => {
            this.server = await this.getServer();
            this.logger = await this.getLogger();
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
                    this.dynamicPlayerCount = this.config.dynamicPlayerCount;
                    this.economy = this.config.economyAPI;
                    this.tpa = this.config.tpa;
                })
            },500)
        },1000)
    }

    /**
     * Builds db
     */
    async buildDB() {
        return buildDB(await this.getLogger());
    }

    /**
     * Returns db
     */
    async attachDB() {
        return attachDB(await this.getLogger());
    }

    /**
     * Returns server
     */
    async getServer() {
        return await this.getApi().getServer();
    }

    /**
     * Returns raknet
     */
    async getRaknet() {
        return getRaknet(await this.getServer());
    }

    /**
     * Returns config
     */
    async getConfig() {
        return await this.attachConfig();
    }

    /**
     * Builds config
     */
    async buildConfig() {
        return buildConfig(await this.getLogger());
    }

    /**
     * Attaches to config
     */
    async attachConfig() {
        return await attachConfig(await this.getLogger());
    }

    /**
     * 
     * @param {String} target 
     */
    async checkUser(target) {
        const config = await this.getConfig();
        return checkUser(target, config, await this.getLogger());
    }

    /**
     * 
     * @param {String} target 
     */
    getPrefix(target) {
        return getPrefix(target);
    }

    /**
     * 
     * @param {String} target 
     * @param {String} content 
     */
    async setPrefix(target, content) {
        const config = await this.getConfig();
        return setPrefix(target, content, config.chatFormat);
    }

    /**
     * 
     * @param {String} target 
     */
    getSuffix(target) {
        return getSuffix(target);
    }

    /**
     * 
     * @param {String} target 
     * @param {String} content 
     */
    async setSuffix(target, content) {
        const config = await this.getConfig();
        return setSuffix(target, content, config.chatFormat);
    }

    /**
     * 
     * @param {String} content 
     */
    async setMotd(content) {
        return await setMotd(content, await this.getRaknet());
    }

    /**
     * 
     * @param {String} sender 
     * @param {String} content 
     */
    async emitMessage(sender, content) {
        const config = await this.getConfig();
        return emitMessage(sender, content, config.webChat, await this.getLogger())
    }
    
    /**
     * 
     * @param {String} target 
     */
    async getBalanceByName(target) {
        return getBalanceByName(target, await this.getLogger());
    }

    /**
     * 
     * @param {String} target 
     */
    async getBalanceByXuid(target) {
        return getBalanceByXuid(target, await this.getLogger());
    }

    /**
     * 
     * @param {String} method 
     * @param {String} target 
     * @param {Number} amount 
     */
    updateBalanceByName(method, target, amount) {
        return updateBalanceByName(method, target, amount);
    }

    /**
     * 
     * @param {String} method 
     * @param {String} target 
     * @param {Number} amount 
     */
    updateBalanceByXuid(method, target, amount) {
        return updateBalanceByXuid(method, target, amount);
    }

    /**
     * 
     * @param {String} name 
     * @param {Number} x
     * @param {Number} y 
     * @param {Number} z 
     */
    async addWarp(name, x, y, z) {
        return addWarp(name, x, y, z, await this.getLogger())
    }

    /**
     * 
     * @param {String} name 
     */
    async removeWarp(name) {
        return removeWarp(name, await this.getLogger())
    }

    /**
     * 
     * @param {String} name 
     */
    async getWarps(name) {
        return getWarps(name, await this.getLogger())
    }

    /**
     * 
     * @param {String} target_name 
     */
    async getHome(target) {
        return getHome(target, await this.getLogger())
    }

    /**
     * 
     * @param {String} target_name
     * @param {Object} pos_object
     */
    async setHome(target, pos) {
        return setHome(target, pos)
    }

    /**
     * 
     * @param {String} target 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} z 
     */
    setPOS(target, x, y, z) {
        return setPOS(target, x, y, z);
    }

    /**
     *  Returns logger
     */
    async getLogger() {
        return await this.getApi().getLogger();
    }

    /**
     *  Returns pluginAPI
     */
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