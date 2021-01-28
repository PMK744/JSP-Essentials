const Plugin = require('../base/Essentials');
const { literal, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class warp extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        const moduleName = "[§5Warps§r]"
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.tpa.commands.warp != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: 'pmk:warp',
                        description: 'Warp to certain locations of the server',
                        register: dispatch => {
                            dispatch.register(
                                literal("warp").then(
                                    argument("method", string()).executes(async context => {
                                        const sender = context.getSource();
                                        const method = context.getArgument("method");
                                        if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                                        switch (method.toLowerCase()) {
                                            case "list":
                                                const warps = await this.getWarps();
                                                if (warps.length == 0) return sender.sendMessage("§cThere were no warps found on this server!");
                                                sender.sendMessage("§l§dAll Know Server Warps:§r");
                                                await warps.forEach(x => {
                                                    sender.sendMessage(`§7 - §b[/warp ${x.name}]§r`);
                                                });
                                                break;
                                            default:
                                                let warp = await this.getWarps(method);
                                                if (warp.length == 0) return sender.sendMessage("§cWarp not found!");
                                                this.setPOS(sender, warp[0].x, warp[0].y, warp[0].z)
                                                return sender.sendMessage(`§aYou have been warped to "${warp[0].name}"!`);
                                        }
                                    })
                                )
                            )
                        },
                    },
                    this.getApi().getServer(),
                );
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: 'pmk:managewarp',
                        description: 'Adds or removes a warp location to the warp list',
                        permission: 'minecraft.command.op',
                        register: dispatch => {
                            dispatch.register(
                                literal("managewarp").then(
                                    argument("method", string()).then(
                                        argument("name", string()).executes(async context => {
                                            const sender = context.getSource();
                                            const method = context.getArgument("method");
                                            const name = context.getArgument("name");
                                            if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                                            switch (method.toLowerCase()) {
                                                case "add":
                                                    let atemptAdd = await this.addWarp(name, await transNum(sender.x), await transNum(sender.y), await transNum(sender.z));
                                                    if (atemptAdd == true) {
                                                        return sender.sendMessage(`§aSuccessfully added "${name}" as a server warp!`);
                                                    } else {
                                                        return sender.sendMessage(`§c"${name}" already exsists as a server warp!`);
                                                    }
                                                case "remove":
                                                    let atemptRemove = await this.removeWarp(name);
                                                    return sender.sendMessage("§aWarp Deleted!");
                                                default:
                                                    return sender.sendMessage("§cInvaild Method! [add|remove]");
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

function transNum(n) {
	return Math.floor(n);
}