const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');


//UPDATE archery SET level = ${nextLevel} WHERE xuid = '${player.xuid}

module.exports = async function setSuffix(target, content, chatFormat) {
    let name = target.username;
    let xuid = target.xuid;
    if (content === undefined) content = chatFormat.suffix;
    let db = await new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
    await db.run(`UPDATE users SET suffix = '${content}' WHERE xuid = ${xuid}`);
    name.suffix = content;
    db.close();
}