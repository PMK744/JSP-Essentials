const Plugin = require('../base/Essentials');
const { literal, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class balance extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        const moduleName = "[§5economyAPI§r]"
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.economy.commands.balance != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: "pmk:balance",
                        description: "Checks your balance",
                        register: dispatch => {
                            dispatch.register(
                                literal("balance").executes(
                                    async context => {
                                        const sender = context.getSource();
                                        if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                                        const balance = await this.getBalanceByName(sender.username.name);
                                        sender.sendMessage(`§7Your Balance: §a$${balance}§r`);
                                    }
                                ),
                            );
                        },
                    },
                    this.getApi().getServer(),
                );
            }
        });
    };
};