const Plugin = require('../base/Essentials');
const { literal, integer, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class updatebalance extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.economy.commands.updateBalance != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: 'pmk:updatebalance',
                        description: 'Updates the balance of a player',
                        permission: 'minecraft.command.op',
                        register: dispatch => {
                            dispatch.register(
                                literal("updatebalance").then(
                                    argument("player", string()).then(
                                        argument("method", string()).then(
                                            argument("amount", integer()).executes(async context => {
                                                const sender = context.getSource();
                                                const player = context.getArgument("player");
                                                const method = context.getArgument("method");
                                                const amount = context.getArgument("amount");
                                                if (method != "add" && method != "set" && method != "remove") return sender.sendMessage("§cInvaild Method! [add|set|remove]");
                                                this.updateBalanceByName(method, player, amount);
                                            })
                                        )
                                    )
                                )
                            )
                        },
                    },
                    this.getApi().getServer(),
                );
            }
        });
    };
};