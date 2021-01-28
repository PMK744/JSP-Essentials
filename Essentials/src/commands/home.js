const Plugin = require('../base/Essentials');
const { literal, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class home extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        const moduleName = "[§5Home§r]"
        let checkConfig = setInterval(() => {
            if (this.config == undefined) {} else {
                clearInterval(checkConfig);
                if (this.tpa.commands.home != "enabled") return;
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: "pmk:home",
                        description: "Warp to your home location",
                        register: dispatch => {
                            dispatch.register(
                                literal("home").executes(
                                    async context => {
                                        const sender = context.getSource();
                                        if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                                        let home = await this.getHome(sender.username.name)
                                        this.setPOS(sender, home.x, home.y, home.z)
                                        sender.sendMessage("§aYou have warped to your home location!");
                                    }
                                ),
                            );
                        },
                    },
                    this.getApi().getServer(),
                );
                this.getApi().getServer().getCommandManager().registerClassCommand(
                    {
                        id: "pmk:sethome",
                        description: "Set the location of your home",
                        register: dispatch => {
                            dispatch.register(
                                literal("sethome").executes(
                                    async context => {
                                        const sender = context.getSource();
                                        if (!sender.isPlayer()) return this.logger.info(moduleName + " §cThis command can't be used in console!");
                                        let pos = {
                                            x: await transNum(sender.x),
                                            y: await transNum(sender.y),
                                            z: await transNum(sender.z)
                                        }
                                        await this.setHome(sender.username.name, pos);
                                        sender.sendMessage("§aYou have successfully set your home location!");
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

function transNum(n) {
	return Math.floor(n);
}