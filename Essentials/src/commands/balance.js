const Plugin = require('../base/BasePlugin');

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
                        id: 'pmk:balance',
                        description: 'Checks your balance',
                        flags: 0,
                        aliases: [],
                        execute: async (sender, args) => {
                            if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                            const balance = await this.getBalanceByName(sender.username.name);
                            sender.sendMessage(`§7Your Balance: §a$${balance}§r`);
                        },
                    },
                    this.getApi().getServer()
                );
            }
        });
    }
};

