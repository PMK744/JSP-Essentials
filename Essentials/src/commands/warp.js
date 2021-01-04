const Plugin = require('../base/Essentials');
module.exports = class about extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        let checkConfig = setInterval(() => {
            if (this.tpa == undefined) {} else {
                clearInterval(checkConfig);
                if (this.tpa.commands.warp != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: 'pmk:warp',
                        description: 'Warp to certain locations of the server',
                        flags: 0,
                        aliases: [],
                        execute: async (sender, args) => {
                            const perms = this.getApi().getServer().getPermissionManager();
                            if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                            if (!args[0] && perms.isOp(sender.username.name) == false) return sender.sendMessage("§7Use §b[/warp list]§7 to show a list of server warps.");
                            if (!args[0] && perms.isOp(sender.username.name) == true) return sender.sendMessage("§7Use §b[/warp list]§7 to show a list of server warps.\nUse §b[/warp add]§7 to add a server warp\nUse §b[/warp remove]§7 to remove a server warp");
                            let sub = args[0].replace(" ", "");
                            if (sub == "add" && perms.isOp(sender.username.name) == false) return sender.sendMessage("§cYou do not have permission to perform this command!");
                            if (sub == "remove" && perms.isOp(sender.username.name) == false) return sender.sendMessage("§cYou do not have permission to perform this command!");
                            if (sub == "add") {
                                if (!args[1]) return sender.sendMessage("§cYou must include a warp name!");
                                let name = args[1].replace(" ", "");
                                let atemptAdd = await this.addWarp(name, await transNum(sender.x), await transNum(sender.y), await transNum(sender.z));
                                if (atemptAdd == true) {
                                    return sender.sendMessage(`§aSuccessfully added "${name}" as a server warp!`);
                                } else {
                                    return sender.sendMessage(`§c"${name}" already exsists as a server warp!`);
                                }
                            } else if (sub == "remove") {
                                if (!args[1]) return sender.sendMessage("§cYou must include a warp name!");
                                let name = args[1].replace(" ", "");
                                let atemptAdd = await this.removeWarp(name);
                                return sender.sendMessage("§aWarp Deleted!");
                            } else if (sub == "list") {
                                let warps = await this.getWarps();
                                if (warps.length == 0) return sender.sendMessage("§cThere were no warps found on this server!");
                                sender.sendMessage("§l§dAll Know Server Warps:§r");
                                await warps.forEach(x => {
                                    sender.sendMessage(`§7 - §b[/warp ${x.name}]§r`);
                                });
                            } else {
                                let name = args[0].replace(" ", "");
                                let warp = await this.getWarps(name);
                                if (warp.length == 0) return sender.sendMessage("§cWarp not found!");
                                this.setPOS(sender, warp[0].x, warp[0].y, warp[0].z)
                                return sender.sendMessage(`§aYou have been warped to "${warp[0].name}"!`);
                            }
                        },
                    },
                    this.getApi().getServer()
                );
            }
        });
    }
};

function transNum(n) {
	return Math.floor(n);
}