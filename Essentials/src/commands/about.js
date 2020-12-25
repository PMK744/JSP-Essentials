const Plugin = require('../base/BasePlugin');

module.exports = class about extends Plugin {
    constructor(pluginData) {
        super(pluginData);

        this.getApi().getServer().getCommandManager().registerClassCommand(
                {
                    id: 'pmk:about',
                    description: 'Returns important stuff they wont tell you....... commies',
                    flags: 0,
                    aliases: [],
                    execute: (sender, args) => {
                        if (!args[0]) {
                            console.log("Base Methods: \n");
                            console.log(getMethods(this))
                            console.log("\n\n");
                            return console.log("Include methods as args...\nEXAMPLE:: .getApi().getServer()")
                        }
                        try {
                            getMethods(eval("this" + args[0]))
                                .then(res => {
                                    console.log(res)
                                })
                                .catch(() => {
                                    console.log("\n\nERROR: Method Reached Final State\n\n")
                                })
                        } catch(err) {
                            console.log("\n\nERROR: Invalid Method\n\n")
                        }
                    },
                },
                this.getApi().getServer()
            );
    }
};

const getMethods = (obj) => {
    return new Promise((res, rej) => {
        try {
            let properties = new Set()
            let currentObj = obj
            do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
            } while ((currentObj = Object.getPrototypeOf(currentObj)))
            res([...properties.keys()].filter(item => typeof obj[item] === 'function'))
        } catch(err) {
            rej(err)
        }
    })
}