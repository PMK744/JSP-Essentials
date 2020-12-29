const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { existsSync } = require("fs");

module.exports = async function buildDB(logger) {
    const moduleName = "[§5Database§r]"
    return new Promise((res) => {
        if (existsSync(path.resolve(__dirname, '../../../essentials.db'))) {
            res(new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), err => {
                if (err) return logger.error(moduleName + err.message);
                logger.info(moduleName + " §aSuccessfully mounted to essentials.db");
            }));
        } else {
            logger.info(moduleName + " §cDatabase file does not exist. Attempting to resolve issue by creating database...")
            res(new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
                logger.info(moduleName + " §aSuccessfully made essentials.db")
                logger.info(moduleName + " §aSuccessfully mounted to essentials.db")
            }));
        }
    })
}