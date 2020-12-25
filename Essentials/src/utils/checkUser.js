const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function checkUser(target) {
    return new Promise((res, rej) => {
        let name = target.username.name;
        let xuid = target.xuid;
        let db = new sqlite3.Database(path.resolve(__dirname, `../../essentials.db`), sqlite3.OPEN_READWRITE);
        let query = `SELECT xuid FROM users WHERE xuid = ${xuid}`;
        db.get(query, (err, row) => {
            if (err) throw err;
            if (row == undefined) {
                let addUser = db.prepare(`INSERT INTO users VALUES("${name}", ${xuid}, "<", ">")`);
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