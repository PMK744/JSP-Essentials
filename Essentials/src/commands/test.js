const Plugin = require('../base/Essentials');
const { literal, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class sendPacket extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        this.getApi().getServer().getCommandManager().registerClassCommand(
            {
                id: "pmk:test",
                description: "Runs test",
                register: Dispatcher => {
                    Dispatcher.register(
                        literal("test").then(
                            argument("edit", string()).executes(async context => {
                                const edit = context.getArgument("edit");
                                console.log(edit);
                            }))
                    )
                },
            },
            this.getApi().getServer(),
        );
    };
};