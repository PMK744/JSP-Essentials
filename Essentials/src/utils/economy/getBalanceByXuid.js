const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function getBalanceByXuid(target, logger) {
    const moduleName = "[§5economyAPI§r]"
    let db = await new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
    return new Promise((res, rej) => {
        let query = `SELECT * FROM users WHERE xuid = ${target}`;
        db.all(query, (err, rows) => {
            if (err) return logger.error(moduleName + " " + err.message)
            res(rows[0].balance)
        })
    })
}