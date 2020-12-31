const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async function updateBalanceByName(method, target, amount) {
    if (isNaN(amount)) return;
    if (method == "remove") {
        let db = await new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
        await db.run(`UPDATE users SET balance = balance-${amount} WHERE name = "${target}"`);
        db.close();
    }
    if (method == "add") {
        let db = await new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
        await db.run(`UPDATE users SET balance = balance+${amount} WHERE name = "${target}"`);
        db.close();
    }
    if (method == "set") {
        let db = await new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE);
        await db.run(`UPDATE users SET balance = ${amount} WHERE name = "${target}"`);
        db.close();
    }
}