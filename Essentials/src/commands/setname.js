const Plugin = require('../base/Essentials');

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
                        flags: 0,
                        aliases: [],
                        execute: async (sender, args) => {
                            if (!args[0]) return sender.sendMessage("§cInvaild Syntax!§r\nExample: /setname [target: player] <prefix|suffix> Member\nNote: it the target name has a space, replace the space with -");
    
                            let target = this.getApi().getServer().getPlayerByName(args[0].replace("-", " "));
                            let sub = args[1].replace(" ", "");
                            let content = args.join(" ").replace(`${args[0]} ${sub} `, "")
    
                            if (sub != "prefix" && sub != "suffix" && sub != "name") return sender.sendMessage("§cInvaild Syntax!§r\nExample: /setname [target: player] <prefix|suffix> Member\nNote: it the target name has a space, replace the space with -");
    
                            if (sub == "prefix") {
                                await this.setPrefix(target, content);
                                return sender.sendMessage(`Successfuly set ${target.username.name}\'s prefix to: \"${content}\"`);
                            } else if (sub == "suffix") {
                                await this.setSuffix(target, content);
                                return sender.sendMessage(`Successfuly set ${target.username.name}\'s suffix to: \"${content}\"`);
                            } else {
                                return sender.sendMessage(`Currently disabled...`);
                            }
                        },
                    },
                    this.getApi().getServer()
                );
            }
        });
    }
};

