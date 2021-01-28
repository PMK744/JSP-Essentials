const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function checkUser(target, config, logger) {
    return new Promise((res, rej) => {
        let defaultBal = config.economyAPI.deafaultBalance;
        let worldSpawnPointX = config.tpa.serverSpawnLocation.x;
        let worldSpawnPointY = config.tpa.serverSpawnLocation.y;
        let worldSpawnPointZ = config.tpa.serverSpawnLocation.z;
        let worldSpawnPoint = `${worldSpawnPointX} ${worldSpawnPointY} ${worldSpawnPointZ}`;
        if (isNaN(defaultBal)) {
            const moduleName = "[§5economyAPI§r]"
            defaultBal = 0;
            logger.error(moduleName + " §cThe defaultBalance must be an integer!")
        }
        let name = target.username.name;
        let xuid = target.xuid;
        let db = new sqlite3.Database(path.resolve(__dirname, `../../essentials.db`), sqlite3.OPEN_READWRITE);
        let query = `SELECT xuid FROM users WHERE xuid = ${xuid}`;
        db.get(query, (err, row) => {
            if (err) throw err;
            if (row == undefined) {
                let addUser = db.prepare(`INSERT INTO users VALUES("${name}", ${xuid}, "<", ">", ${defaultBal}, "${worldSpawnPoint}")`);
                addUser.run();
                addUser.finalize();
                db.close();
                return res(true);
            } else {
                return res(false);
            }
        })
    })
}