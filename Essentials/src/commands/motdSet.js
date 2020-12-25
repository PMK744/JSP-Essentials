//.getApi().getServer().getRaknet().getName()

const Plugin = require('../base/BasePlugin');

module.exports = class about extends Plugin {
    constructor(pluginData) {
        super(pluginData);
        this.motds = []
        this.interval = null
        this.currentMotd = 0
        this.registerCommands()
    }
    registerCommands() {
        const commandManager = this.getApi().getServer().getCommandManager()
        commandManager.registerClassCommand(
            {
                id: 'pmk:addmotd',
                description: 'Adds a motd to the motd list',
                flags: 0,
                aliases: [],
                execute: (sender, args) => {
                    this.addMotd(sender, args)
                },
            },
            this.getApi().getServer()
        );
        commandManager.registerClassCommand(
            {
                id: 'pmk:removemotd',
                description: 'Removes a motd from the motd list',
                flags: 0,
                aliases: [],
                execute: (sender, args) => {
                    this.removeMotd(sender, args)
                },
            },
            this.getApi().getServer()
        );
        commandManager.registerClassCommand(
            {
                id: 'pmk:startmotd',
                description: 'Starts the motd loop with a given interval in seconds',
                flags: 0,
                aliases: [],
                execute: (sender, args) => {
                    this.startInterval(sender, args)
                },
            },
            this.getApi().getServer()
        );
        commandManager.registerClassCommand(
            {
                id: 'pmk:stopmotd',
                description: 'Stops the motd loop',
                flags: 0,
                aliases: [],
                execute: (sender, args) => {
                    this.stopInterval(sender, args)
                },
            },
            this.getApi().getServer()
        );
        commandManager.registerClassCommand(
            {
                id: 'pmk:clearallmotds',
                description: 'Clears all motds from the motd list',
                flags: 0,
                aliases: [],
                execute: (sender, args) => {
                    this.clearAll(sender, args)
                },
            },
            this.getApi().getServer()
        );
    }
    addMotd(s, a) {
        this.motds.push(a.join(" "))
    }
    removeMotd(s, a) {
        this.motds = this.motds.filter(m => m !== a.join(" "))
    }
    clearAll(s, a) {
        this.motds = []
    }
    startInterval(s, a) {
        if (!this.interval) {
            if (parseInt(a[0]) && parseInt(a[0]) < 5) return s.sendMessage("Your interval need to be above 5s");
            if (!this.motds[0]) return s.sendMessage("You need a provide at least 1 motd to start the motd intervals.");
            let interval = parseInt(a[0])
            if (!interval) interval = 10
            this.setMotd(this.motds[this.currentMotd])
            this.interval = setInterval(() => {
                if (!this.motds[0]) return
                if (this.motds.length === this.currentMotd) this.currentMotd = 0
                this.setMotd(this.motds[this.currentMotd])
                this.currentMotd++
            }, 1000 * interval)
        }
    }
    stopInterval(s, a) {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
    }
    setMotd(motd) {
        this.getApi().getServer().getRaknet().getName().setMotd(motd)
    }
};