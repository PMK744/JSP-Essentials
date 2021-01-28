const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function setHome(target, pos) {
    let db = await new sqlite3.Database(path.resolve(__dirname, `../../../../essentials.db`), sqlite3.OPEN_READWRITE);
    await db.run(`UPDATE users SET homePOS = "${pos.x} ${pos.y} ${pos.z}" WHERE name = "${target}"`);
    db.close();
}