const Plugin = require('../base/BasePlugin');
module.exports = class about extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        this.getApi().getServer().getCommandManager().registerClassCommand(
                {
                    id: 'pmk:test',
                    description: 'Returns important stuff they wont tell you....... commies',
                    flags: 0,
                    aliases: [],
                    execute: (sender, args) => {


                        console.log(this.raknet);
                    },
                },
                this.getApi().getServer()
            );
    }
};