const Plugin = require('../base/Essentials');
module.exports = class about extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        this.getApi().getServer().getCommandManager().registerClassCommand(
                {
                    id: 'pmk:test',
                    description: 'Returns important stuff they wont tell you....... commies',
                    flags: 0,
                    aliases: [],
                    execute: async (sender, args) => {
                        console.log(this.getServer())
                    },
                },
                this.getApi().getServer()
            );
    }
};
