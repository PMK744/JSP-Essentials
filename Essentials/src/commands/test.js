const Plugin = require('../base/Essentials');
const { literal, argument, string, } = require("@jsprismarine/brigadier");

module.exports = class sendPacket extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        this.getApi().getServer().getCommandManager().registerClassCommand(
            {
                id: "pmk:test",
                description: "Runs test",
                register: Dispatcher => {
                    Dispatcher.register(
                        literal("test").then(
                            argument("edit", string()).executes(async context => {
                                const edit = context.getArgument("edit");
                                const sender = context.getSource();
                                const bedrock = this.getApi().getServer().getBlockManager().getBlock('minecraft:bedrock');
                                const dirt = this.getApi().getServer().getBlockManager().getBlock('minecraft:dirt');
                                const grass = this.getApi().getServer().getBlockManager().getBlock('minecraft:grass');

                                sender.currentChunk.setBlock(0, 100, 0, grass);
                                let block = sender.currentChunk.getBlock(0, 100, 0)
                                console.log(block);
                            }))
                    )
                },
            },
            this.getApi().getServer(),
        );
    };
};