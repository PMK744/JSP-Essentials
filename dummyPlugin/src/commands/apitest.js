const Plugin = require('../base/BasePlugin');
module.exports = class about extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        this.getApi().getServer().getCommandManager().registerClassCommand(
                {
                    id: 'pmk:apitest',
                    description: 'Returns important stuff they wont tell you....... commies',
                    flags: 0,
                    aliases: [],
                    execute: async (sender, args) => {

                        //declares the variables
                        let db;
                        let config;

                        //Makes a new object of the essentials plugin.
                        let essentials = this.getEssentials();

                        //Connects to the essentials database.
                        await essentials.attachDB().then(res => {
                            db = res;
                        })

                        //Connects to the config file for the essentials plugin
                        await essentials.attachConfig().then(res => {
                            config = res;
                        })

                        //Sends config to console
                        this.getApi().getServer().getLogger().info(config);

                        /*Useful Functions
                            chatFormat:
                                essentials.getPrefix(PlayerOBJ);
                                essentials.getSuffix(PlayerOBJ);
                                essentials.setPrefix(PlayerOBJ);
                                essentials.getSuffix(PlayerOBJ);
                            dynamicMotd: (Works if dynamicMotd is disabled)
                                essentials.setMotd(content);
                            economyAPI:
                                essentials.getBalanceByName(PlayerName);
                                essentials.getBalanceByXuid(PlayerXuid);
                                essentials.updateBalanceByName(<add|set|remove>, PlayerName, amount)
                                essentials.updateBalanceByXuid(<add|set|remove>, PlayerXuid, amount)
                            webChat:
                                essentials.emitMessage(content)
                        */


                    },
                },
                this.getApi().getServer()
            );
    }
};