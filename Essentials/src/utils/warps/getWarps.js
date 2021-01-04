const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function getWarps(name, logger) {
    let query;
    if (name == undefined) {
        query = `SELECT * FROM warps`;
    } else {
        query = `SELECT * FROM warps WHERE name = "${name}"`;
    }
    return new Promise((res, rej) => {
        const moduleName = "[§5Warps§r]"
        let db = new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
        db.all(query, (err, row) => {
            if (err) return logger.error(moduleName + " " + err.message)
            res(row)
        })
    })
}