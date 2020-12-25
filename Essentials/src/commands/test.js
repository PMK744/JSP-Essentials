const Plugin = require('../base/BasePlugin');

module.exports = class about extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        this.getApi().getServer().getCommandManager().registerClassCommand(
                {
                    id: 'pmk:test',
                    description: 'Returns important stuff they wont tell you....... commies',
                    flags: 0,
                    aliases: [],
                    execute: (sender, args) => {
                        let db = this.getDB()
                        let user = "PMK";
                        db.run(`CREATE TABLE IF NOT EXISTS tsdata(user TEXT, id INT)`, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("Table was created!");
                            }
                            
                        })
                    },
                },
                this.getApi().getServer()
            );
    }
};