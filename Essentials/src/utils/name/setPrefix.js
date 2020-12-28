const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function setPrefix(target, content, chatFormat) {
    let name = target.username;
    let xuid = target.xuid;
    if (content === undefined) content = chatFormat.prefix;
    let db = await new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
    await db.run(`UPDATE users SET prefix = '${content}' WHERE xuid = ${xuid}`);
    name.prefix = content;
    db.close();
}