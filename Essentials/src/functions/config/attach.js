const fs = require('fs');
const yaml = require('js-yaml');

exports.initialize = async function() {
    return new Promise((resolve) => {
        const rawData = fs.readFileSync('config.yaml')
        const data = yaml.safeLoad(rawData);
        resolve(data.essentials);
    });
}