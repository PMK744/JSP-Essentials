const fs = require('fs');
const yaml = require('js-yaml');

module.exports = async function attachConfig(logger) {
    const moduleName = "[§5Config§r]"
    return new Promise((res) => {
        const rawData = fs.readFileSync('config.yaml')
        const data = yaml.safeLoad(rawData);
        res(data.essentials);
    });
}