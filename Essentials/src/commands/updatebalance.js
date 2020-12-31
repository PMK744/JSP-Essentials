const Plugin = require('../base/Essentials');

module.exports = class updatebalance extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        const moduleName = "[§5economyAPI§r]"
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.economy.commands.updateBalance != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: 'pmk:updatebalance',
                        description: 'Updates the balance of a player',
                        permission: 'minecraft.command.op',
                        flags: 0,
                        aliases: [],
                        execute: async (sender, args) => {
                            if (!args[0]) return sender.sendMessage("§cInvaild Syntax!§r\nExample: /updatebalance [target: player] <add|set|remove> [amount]");
                            let target = this.getApi().getServer().getPlayerByName(args[0].replace("-", " "))
                            if (target == null) return sender.sendMessage("§cNo player was found");
                            let sub = args[1].replace(" ", "");
                            let amount = parseInt(args.join(" ").replace(`${args[0]} ${sub} `, ""));

                            if (sub != "add" && sub != "set" && sub != "remove") return sender.sendMessage("§cInvaild Syntax!§r\nExample: /updatebalance [target: player] <add|set|remove> [amount]");

                            this.updateBalanceByName(sub, target.username.name, amount);
                        },
                    },
                    this.getApi().getServer()
                );
            }
        });
    }
};

