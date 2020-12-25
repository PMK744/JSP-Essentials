const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
exports.initialize = async function() {
    return new Promise((resolve) => {

        fs.readFile('config.yaml', 'utf8', (err, data) => {
            if (err) throw err
            if (!data.includes("essentials:")) {
                fs.readFile(path.join(__dirname, './', 'template.yaml'), 'utf8', (err, configData) => {
                    if (err) throw err
                    fs.appendFile(path.join(__dirname, '../../../../../', 'config.yaml'), configData, err => {
                        if (err) throw err
                        resolve("§aConfig file built! Check the §cconfig.yaml§a to edit the essentials plugin.§r");
                    })
                });
            } else {
                resolve("§aConfig file successfully loaded!§r");
            }
        })
    });
}