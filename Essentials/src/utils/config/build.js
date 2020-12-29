const fs = require('fs');
const path = require('path');

module.exports = async function buildConfig(logger) {
    const moduleName = "[§5Config§r]"
    return new Promise((res) => {
        fs.readFile('config.yaml', 'utf8', (err, data) => {
            if (err) return logger.error(moduleName + err.message);
            if (!data.includes("essentials:")) {
                fs.readFile(path.join(__dirname, './', 'template.yaml'), 'utf8', (err, configData) => {
                    if (err) return logger.error(moduleName + err.message);
                    fs.appendFile(path.join(__dirname, '../../../../../', 'config.yaml'), configData, err => {
                        if (err) return logger.error(moduleName + err.message);
                        logger.info(moduleName + " §aConfig file built! Check the §cconfig.yaml§a to edit the essentials plugin.§r");
                        res("");
                    })
                });
            } else {
                logger.info(moduleName + " §aConfig file successfully loaded!§r");
                res("");
            }
        })
    });
}