//Requires the essentials class from plugin core.
const essentials = require('../../../jsp-essentials/src/base/Essentials')

module.exports = class BasePlugin {
    constructor(plugin, emitter) {
        this.plugin = plugin;
        this.api = plugin.api;
        this.emitter = emitter;
    }
    
    //When executed, creates a new object of the essentials class.
    getEssentials() {
        return new essentials(this.plugin, this.emitter)
    }

    getPlugin() {
        return this.plugin;
    }

    getApi() {
        return this.api;
    }
};