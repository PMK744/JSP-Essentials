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
                        let x = transNum(sender.x)
                        let y = transNum(sender.y)
                        let z = transNum(sender.z)
                        console.log(`X: ${x} Y: ${y} Z: ${z}`)
                    },
                },
                this.getApi().getServer()
            );
    }
};

function transNum(n) {
	return Math.floor(n);
}