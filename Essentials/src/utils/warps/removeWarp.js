const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function removeWarp(name, logger) {
    return new Promise((res, rej) => {
        const moduleName = "[§5Warps§r]"
        let db = new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
        let query = `DELETE FROM warps WHERE name = "${name}"`;
        db.run(query, (err, res) => {
            if (err) return logger.error(moduleName + " " + err.message)
        })
        db.close();
        return res(1);
    })
}