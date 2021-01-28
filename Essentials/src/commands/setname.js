const Plugin = require('../base/Essentials');
const { literal, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class setname extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.chatFormat.commands.setname != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: 'pmk:setname',
                        description: 'Allows you to change the Suffix and Prefix of a player',
                        permission: 'minecraft.command.op',
                        register: dispatch => {
                            dispatch.register(
                                literal("setname").then(
                                    argument("player", string()).then(
                                        argument("method", string()).then(
                                            argument("content", string()).executes(async context => {
                                                const sender = context.getSource();
                                                const player = this.getApi().getServer().getPlayerManager().getPlayerByName(context.getArgument("player"));
                                                const method = context.getArgument("method");
                                                const content = context.getArgument("content");
                                                switch(method.toLowerCase()) {
                                                    case "prefix":
                                                        await this.setPrefix(player, content);
                                                        return sender.sendMessage(`Successfuly set ${player.username.name}\'s prefix to: \"${content}\"`);
                                                    case "suffix":
                                                        await this.setSuffix(player, content);
                                                        return sender.sendMessage(`Successfuly set ${player.username.name}\'s suffix to: \"${content}\"`);
                                                    default:
                                                        return sender.sendMessage("§cInvaild Method! [prefix|suffix]");
                                                }
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