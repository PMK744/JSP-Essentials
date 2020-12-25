const sqlite3 = require('sqlite3').verbose();
const path = require('path');

exports.initialize = async function() {
    return new Promise((resolve) => {
        resolve(new sqlite3.Database(path.resolve(__dirname, `../../../essentials.db`), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) console.log(err.message);
        }));
    })
};