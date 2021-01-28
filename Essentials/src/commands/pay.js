const Plugin = require('../base/Essentials');
const { literal, integer, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class pay extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        const moduleName = "[§5economyAPI§r]"
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.economy.commands.pay != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: 'pmk:pay',
                        description: 'Checks your balance',
                        register: dispatch => {
                            dispatch.register(
                                literal("pay").then(
                                    argument("player", string()).then(
                                        argument("amount", integer()).executes(async context => {
                                            const sender = context.getSource();
                                            const target = this.getApi().getServer().getPlayerManager().getPlayerByName(context.getArgument("player"));
                                            const amount = context.getArgument("amount");
                                            if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                                            if (target == null) return sender.sendMessage("§cNo player was found");
                                            if (target.username.name == sender.username.name) return sender.sendMessage("§cYou can't pay yourself.");
                                            if (amount <= 0) return sender.sendMessage("§cThe minimum you can pay is $1!");
                                            const balance = await this.getBalanceByName(sender.username.name);
                                            if (balance >= amount) {
                                                sender.sendMessage(`§7You have successfully paid §9${target.username.name}§7 §a$${amount}§7!`);
                                                target.sendMessage(`§9${sender.username.name}§7 has paid you §a$${amount}§7!`);
                                                this.updateBalanceByName("remove", sender.username.name, amount)
                                                this.updateBalanceByName("add", target.username.name, amount)
                                            } else {
                                                return sender.sendMessage(`§cYou don't have enough money to pay §9${target.username.name}§c §a$${amount}§c.`);
                                            }
                                        })
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