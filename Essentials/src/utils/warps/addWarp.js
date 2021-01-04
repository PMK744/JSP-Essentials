const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function addWarp(name, x, y, z, logger) {
    return new Promise((res, rej) => {
        const moduleName = "[§5Warps§r]"
        let db = new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
        let query = `SELECT name FROM warps WHERE name = "${name}"`;
        db.get(query, (err, row) => {
            if (err) return logger.error(moduleName + " " + err.message)
            if (row == undefined) {
                let addWarp = db.prepare(`INSERT INTO warps VALUES("${name}", ${x}, ${y}, ${z})`);
                addWarp.run();
                addWarp.finalize();
                db.close();
                return res(true);
            } else {
                return res(false);
            }
        })
    })
}