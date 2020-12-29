const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { existsSync } = require("fs");

module.exports = async function attachDB(logger) {
    const moduleName = "[§5Database§r]"
    return new Promise((res) => {
        if (existsSync(path.resolve(__dirname, '../../../essentials.db'))) {
            res(new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), err => {
                if (err) return logger.error(moduleName + err.message);
            }));
        }
    })
}