const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function getHome(target, logger) {
    const moduleName = "[§5Home§r]"
    let db = await new sqlite3.Database(path.resolve(__dirname, `../../../../essentials.db`), sqlite3.OPEN_READWRITE);
    return new Promise((res, rej) => {
        let query = `SELECT * FROM users WHERE name = "${target}"`;
        db.all(query, (err, rows) => {
            if (err) return logger.error(moduleName + " " + err.message)
            let getPos = rows[0].homePOS.split(" ");
            let pos = {
                x: parseInt(getPos[0]),
                y: parseInt(getPos[1]),
                z: parseInt(getPos[2])
            }
            res(pos)
        })
    })
}