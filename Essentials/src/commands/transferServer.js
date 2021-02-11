const Plugin = require('../base/Essentials');
const { integer, literal, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class TrasnferServer extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.config.jspMethods.commands.transferServer != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: "pmk:transferserver",
                        description: "Transfers player to another server.",
                        register: dispatch => {
                            dispatch.register(
                                literal('transferserver').then(
                                    argument('address', string()).then(
                                        argument('port', integer()).executes(async (context) => {
                                            const sender = context.getSource();
                                            await this.transferserver(sender, context.getArgument('address'), context.getArgument('port'));
                                        })
                                    )
                                )
                            );
                        },
                    },
                    this.getApi().getServer(),
                );
            }
        });
    };
}