const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function getPrefix(target) {
    let xuid = target.xuid
    let db = await new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
    return new Promise((res, rej) => {
        let query = `SELECT * FROM users WHERE xuid = ${xuid}`;
        db.all(query, (err, rows) => {
            if (err) throw err
            res(rows[0].prefix)
        })
    })
}