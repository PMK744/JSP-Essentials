const Plugin = require('../base/BasePlugin');

module.exports = class setname extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        this.getApi().getServer().getCommandManager().registerClassCommand(
                {
                    id: 'pmk:setname',
                    description: 'Allows you to change the Suffix and Prefix of a player',
                    permission: 'minecraft.command.op',
                    flags: 0,
                    aliases: [],
                    execute: async (sender, args) => {
                        
                        if (!sender.isPlayer()) {
                            if (this.chatFormat.commands.setname != "enabled") return this.api.getLogger().info("§cCannot find the desired command!");
                            return;
                        }

                        if (this.chatFormat.commands.setname != "enabled") return sender.sendMessage("§cCannot find the desired command!");

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
};

